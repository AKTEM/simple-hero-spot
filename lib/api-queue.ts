/**
 * API Request Queue System
 * Throttles concurrent requests to prevent overwhelming the WordPress backend
 */

interface QueueItem {
  fn: () => Promise<any>;
  resolve: (value: any) => void;
  reject: (error: any) => void;
  retries: number;
}

class ApiQueue {
  private queue: QueueItem[] = [];
  private activeRequests = 0;
  private maxConcurrent: number;
  private minDelay: number;
  private maxRetries: number;

  constructor(maxConcurrent = 3, minDelay = 200, maxRetries = 3) {
    this.maxConcurrent = maxConcurrent;
    this.minDelay = minDelay;
    this.maxRetries = maxRetries;
  }

  async add<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push({
        fn,
        resolve,
        reject,
        retries: 0,
      });
      this.processQueue();
    });
  }

  private async processQueue() {
    if (this.activeRequests >= this.maxConcurrent || this.queue.length === 0) {
      return;
    }

    const item = this.queue.shift();
    if (!item) return;

    this.activeRequests++;

    try {
      // Add delay between requests to prevent overwhelming the server
      await new Promise(resolve => setTimeout(resolve, this.minDelay));
      
      const result = await item.fn();
      item.resolve(result);
    } catch (error: any) {
      // Handle 508 errors with exponential backoff
      if (error?.status === 508 && item.retries < this.maxRetries) {
        console.log(`Retrying request (attempt ${item.retries + 1}/${this.maxRetries})...`);
        
        // Exponential backoff: 1s, 2s, 4s
        const backoffDelay = Math.pow(2, item.retries) * 1000;
        await new Promise(resolve => setTimeout(resolve, backoffDelay));
        
        // Re-queue the item with incremented retry count
        item.retries++;
        this.queue.unshift(item);
      } else {
        item.reject(error);
      }
    } finally {
      this.activeRequests--;
      this.processQueue();
    }
  }

  clear() {
    this.queue = [];
    this.activeRequests = 0;
  }

  getQueueSize() {
    return this.queue.length;
  }

  getActiveRequests() {
    return this.activeRequests;
  }
}

// Export a singleton instance with conservative settings
// Max 3 concurrent requests, 200ms delay between requests
export const apiQueue = new ApiQueue(3, 200, 3);

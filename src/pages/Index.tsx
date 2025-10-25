import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <section className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left space-y-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Build Something
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Amazing Today
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
            Transform your ideas into reality with our modern platform. Start building the future, one project at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button variant="hero" size="lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
        <div className="flex-1 w-full max-w-2xl">
          <img 
            src={heroImage} 
            alt="Modern abstract design with flowing gradients" 
            className="w-full h-auto rounded-2xl shadow-2xl"
          />
        </div>
      </section>
    </main>
  );
};

export default Index;

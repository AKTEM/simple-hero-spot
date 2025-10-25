"use client";

import Link from 'next/link';
import { 
  Zap, 
  Clock, 
  Globe, 
  MapPin, 
  Grid3X3, 
  Calendar, 
  Leaf, 
  BookOpen, 
  Camera, 
  Headphones,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';
import { SiTiktok } from 'react-icons/si';

const newsFeatures = [
  {
    id: 1,
    title: "Breaking News",
    icon: Zap,
    href: "/",
    description: "Latest breaking stories"
  },
  {
    id: 2,
    title: "Latest Updates",
    icon: Clock,
    href: "/",
    description: "Most recent news"
  },
  {
    id: 3,
    title: "Global News",
    icon: Globe,
    href: "/world",
    description: "International coverage"
  },
  {
    id: 4,
    title: "Regional News",
    icon: MapPin,
    href: "/world/canada",
    description: "Local and regional stories"
  },
  {
    id: 5,
    title: "Category-Specific",
    icon: Grid3X3,
    href: "/politics",
    description: "Browse by topic"
  },
  {
    id: 6,
    title: "Events Calendar",
    icon: Calendar,
    href: "/events",
    description: "Upcoming events"
  },
  {
    id: 7,
    title: "Canadian Content",
    icon: Leaf,
    href: "/daily-maple",
    description: "Stories from Canada"
  },
  {
    id: 8,
    title: "Literary Reviews",
    icon: BookOpen,
    href: "/booknook",
    description: "Book reviews & recommendations"
  },
  {
    id: 9,
    title: "Photographic Insight/Guides",
    icon: Camera,
    href: "/through-the-lens",
    description: "Photography tips & guides"
  },
  {
    id: 10,
    title: "Podcast Series",
    icon: Headphones,
    href: "/the-friday-post",
    description: "Audio content & interviews"
  }
];

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://facebook.com/mapleepoch",
    color: "hover:text-blue-600"
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://x.com/mapleepoch",
    color: "hover:text-blue-400"
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/themapleepoch",
    color: "hover:text-pink-600"
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "https://www.youtube.com/@mapleepoch",
    color: "hover:text-red-600"
  },
  {
    name: "TikTok",
    icon: SiTiktok,
    href: "https://tiktok.me/mapleepoch",
    color: "hover:text-black dark:hover:text-white"
  }
];

export function NewsFeaturesSidebar() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
      {/* Header */}
      <div className="text-center border-b border-gray-200 dark:border-gray-700 pb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          News Features
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Quick access to all our content
        </p>
      </div>

      {/* News Features List */}
      <div className="space-y-3">
        {newsFeatures.map((feature) => {
          const IconComponent = feature.icon;
          return (
            <Link
              key={feature.id}
              href={feature.href}
              className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 transition-all duration-200"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center group-hover:bg-red-200 dark:group-hover:bg-red-800 transition-colors">
                <IconComponent className="w-4 h-4 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-red-600 transition-colors">
                  {feature.title}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {feature.description}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Social Media Section */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Follow Us
        </h4>
        <div className="flex items-center justify-center space-x-4">
          {socialLinks.map((social) => {
            const IconComponent = social.icon;
            return (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-200 hover:scale-110`}
                title={social.name}
              >
                <IconComponent className="w-5 h-5" />
              </Link>
            );
          })}
        </div>
      </div>

     
    </div>
  );
}
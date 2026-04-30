import { useState } from "react";
import { Heart, MessageCircle, Lightbulb, Send } from "lucide-react";

interface Post {
  id: number;
  founderType: string;
  stage: string;
  content: string;
  timestamp: string;
  resonates: number;
  supports: number;
  insights: number;
}

export default function FounderSignal() {
  const [newPost, setNewPost] = useState("");
  
  const posts: Post[] = [
    {
      id: 1,
      founderType: "Founder, SaaS",
      stage: "Pre-seed",
      content: "Spending 60% of my time on hiring right now. Starting to feel like recruiting is the real job and building product is secondary. Anyone else feel this?",
      timestamp: "2h ago",
      resonates: 12,
      supports: 8,
      insights: 3
    },
    {
      id: 2,
      founderType: "Founder, AI/ML",
      stage: "Seed",
      content: "First time feeling real founder loneliness. Team is great, but nobody to talk to about the decision weight. Therapy helps but it's different.",
      timestamp: "5h ago",
      resonates: 24,
      supports: 18,
      insights: 7
    },
    {
      id: 3,
      founderType: "Founder, B2B",
      stage: "Revenue",
      content: "Hit $50k MRR today. Feels good but also... nothing changed? Expected to feel different. The goalpost just moved.",
      timestamp: "8h ago",
      resonates: 31,
      supports: 22,
      insights: 12
    },
    {
      id: 4,
      founderType: "Founder, Consumer",
      stage: "MVP",
      content: "Burned out after 14 months. Taking first real break in a year. The guilt is overwhelming but I know I need this.",
      timestamp: "12h ago",
      resonates: 19,
      supports: 27,
      insights: 9
    }
  ];

  return (
    <div className="min-h-full bg-[#0F0F14] text-white px-6 pt-14 pb-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Founder Signal</h1>
        <p className="text-sm text-white/50">Share anonymously, connect authentically</p>
      </div>

      {/* Post Input */}
      <div className="bg-[#1A1A25] border border-white/10 rounded-2xl p-4 mb-6">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share something anonymously..."
          className="w-full bg-transparent text-white placeholder:text-white/30 resize-none outline-none mb-3 min-h-[80px]"
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/40">Posted as: Founder, SaaS, Pre-seed</span>
          <button 
            className="px-4 py-2 bg-[#3B82F6] hover:bg-[#2563EB] rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
            disabled={!newPost.trim()}
          >
            <Send className="w-4 h-4" />
            Post
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-[#1A1A25] border border-white/10 rounded-2xl p-5"
          >
            {/* Post Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white/40" />
                </div>
                <div>
                  <p className="text-sm font-medium">{post.founderType}</p>
                  <p className="text-xs text-white/40">{post.stage}</p>
                </div>
              </div>
              <span className="text-xs text-white/40">{post.timestamp}</span>
            </div>

            {/* Post Content */}
            <p className="text-sm text-white/80 leading-relaxed mb-4">
              {post.content}
            </p>

            {/* Interaction Buttons */}
            <div className="flex items-center gap-2">
              <button className="flex-1 px-3 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#3B82F6]/30 rounded-lg transition-all flex items-center justify-center gap-2 group">
                <Heart className="w-4 h-4 text-white/40 group-hover:text-[#3B82F6] transition-colors" />
                <span className="text-xs font-medium text-white/60 group-hover:text-white transition-colors">
                  {post.resonates}
                </span>
              </button>

              <button className="flex-1 px-3 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 rounded-lg transition-all flex items-center justify-center gap-2 group">
                <MessageCircle className="w-4 h-4 text-white/40 group-hover:text-emerald-500 transition-colors" />
                <span className="text-xs font-medium text-white/60 group-hover:text-white transition-colors">
                  {post.supports}
                </span>
              </button>

              <button className="flex-1 px-3 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#8B5CF6]/30 rounded-lg transition-all flex items-center justify-center gap-2 group">
                <Lightbulb className="w-4 h-4 text-white/40 group-hover:text-[#8B5CF6] transition-colors" />
                <span className="text-xs font-medium text-white/60 group-hover:text-white transition-colors">
                  {post.insights}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

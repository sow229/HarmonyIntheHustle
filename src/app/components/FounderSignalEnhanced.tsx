import { useState } from "react";
import { 
  ArrowUp, 
  ArrowDown, 
  MessageCircle, 
  Send, 
  MapPin, 
  TrendingUp, 
  Clock, 
  Flame,
  Share2,
  MoreHorizontal,
  X
} from "lucide-react";

interface Comment {
  id: number;
  content: string;
  timestamp: string;
  upvotes: number;
  founderType: string;
}

interface Post {
  id: number;
  founderType: string;
  stage: string;
  content: string;
  timestamp: string;
  location: string;
  distance: string;
  upvotes: number;
  downvotes: number;
  commentCount: number;
  userVote?: "up" | "down" | null;
  comments?: Comment[];
  isHot?: boolean;
}

export default function FounderSignalEnhanced() {
  const [newPost, setNewPost] = useState("");
  const [sortBy, setSortBy] = useState<"hot" | "new" | "top">("hot");
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [newComment, setNewComment] = useState("");
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      founderType: "Founder, SaaS",
      stage: "Pre-seed",
      content: "Spending 60% of my time on hiring right now. Starting to feel like recruiting is the real job and building product is secondary. Anyone else feel this?",
      timestamp: "2h ago",
      location: "San Francisco, CA",
      distance: "0.2 mi",
      upvotes: 42,
      downvotes: 3,
      commentCount: 12,
      userVote: null,
      isHot: true,
      comments: [
        {
          id: 1,
          content: "100%. Hiring is literally half the job at early stage. The quality of your first 10 hires makes or breaks everything.",
          timestamp: "1h ago",
          upvotes: 18,
          founderType: "Founder, B2B"
        },
        {
          id: 2,
          content: "This is normal. Once you have product-market fit, it's all about the team. You're doing it right.",
          timestamp: "45m ago",
          upvotes: 12,
          founderType: "Founder, AI/ML"
        }
      ]
    },
    {
      id: 2,
      founderType: "Founder, AI/ML",
      stage: "Seed",
      content: "First time feeling real founder loneliness. Team is great, but nobody to talk to about the decision weight. Therapy helps but it's different.",
      timestamp: "5h ago",
      location: "Palo Alto, CA",
      distance: "1.8 mi",
      upvotes: 87,
      downvotes: 2,
      commentCount: 24,
      userVote: "up",
      isHot: true,
      comments: []
    },
    {
      id: 3,
      founderType: "Founder, B2B",
      stage: "Revenue",
      content: "Hit $50k MRR today. Feels good but also... nothing changed? Expected to feel different. The goalpost just moved.",
      timestamp: "8h ago",
      location: "Mountain View, CA",
      distance: "3.2 mi",
      upvotes: 64,
      downvotes: 5,
      commentCount: 18,
      userVote: null,
      isHot: false,
      comments: []
    },
    {
      id: 4,
      founderType: "Founder, Consumer",
      stage: "MVP",
      content: "Burned out after 14 months. Taking first real break in a year. The guilt is overwhelming but I know I need this.",
      timestamp: "12h ago",
      location: "San Jose, CA",
      distance: "5.1 mi",
      upvotes: 103,
      downvotes: 1,
      commentCount: 31,
      userVote: null,
      isHot: true,
      comments: []
    },
    {
      id: 5,
      founderType: "Founder, Fintech",
      stage: "Series A",
      content: "VCs keep asking for more traction before Series A. We're at $200k ARR growing 15% MoM. When is it enough?",
      timestamp: "14h ago",
      location: "San Francisco, CA",
      distance: "0.5 mi",
      upvotes: 56,
      downvotes: 8,
      commentCount: 22,
      userVote: null,
      isHot: false,
      comments: []
    }
  ]);

  const handleVote = (postId: number, voteType: "up" | "down") => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const currentVote = post.userVote;
        let newUpvotes = post.upvotes;
        let newDownvotes = post.downvotes;
        let newUserVote: "up" | "down" | null = voteType;

        // Remove previous vote
        if (currentVote === "up") newUpvotes--;
        if (currentVote === "down") newDownvotes--;

        // Add new vote or cancel
        if (currentVote === voteType) {
          newUserVote = null;
        } else {
          if (voteType === "up") newUpvotes++;
          if (voteType === "down") newDownvotes++;
        }

        return {
          ...post,
          upvotes: newUpvotes,
          downvotes: newDownvotes,
          userVote: newUserVote
        };
      }
      return post;
    }));
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === "hot") {
      const scoreA = (a.upvotes - a.downvotes) / (Math.max(parseInt(a.timestamp) || 1, 1));
      const scoreB = (b.upvotes - b.downvotes) / (Math.max(parseInt(b.timestamp) || 1, 1));
      return scoreB - scoreA;
    } else if (sortBy === "new") {
      return a.id - b.id;
    } else {
      return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
    }
  });

  const selectedPostData = posts.find(p => p.id === selectedPost);

  return (
    <div className="min-h-full bg-gradient-to-b from-[#0F0F14] via-[#0F0F14] to-[#0F141A] dark:bg-gradient-to-b dark:from-[#0F0F14] dark:via-[#0F0F14] dark:to-[#0F141A] bg-white text-gray-900 dark:text-white px-6 pt-14 pb-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2 bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-[#3B82F6] bg-clip-text text-transparent">
          Founder Signal
        </h1>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-white/40" />
          <p className="text-sm text-white/50 dark:text-white/50 text-gray-600">San Francisco Bay Area</p>
        </div>
      </div>

      {/* Sort Tabs */}
      <div className="flex gap-2 mb-6 bg-[#1A1A25] dark:bg-[#1A1A25] bg-gray-100 border border-white/10 dark:border-white/10 border-gray-200 rounded-xl p-1">
        <button
          onClick={() => setSortBy("hot")}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
            sortBy === "hot"
              ? "bg-[#3B82F6] text-white"
              : "text-white/60 dark:text-white/60 text-gray-600 hover:text-white dark:hover:text-white hover:text-gray-900"
          }`}
        >
          <Flame className="w-4 h-4" />
          Hot
        </button>
        <button
          onClick={() => setSortBy("new")}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
            sortBy === "new"
              ? "bg-[#3B82F6] text-white"
              : "text-white/60 dark:text-white/60 text-gray-600 hover:text-white dark:hover:text-white hover:text-gray-900"
          }`}
        >
          <Clock className="w-4 h-4" />
          New
        </button>
        <button
          onClick={() => setSortBy("top")}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
            sortBy === "top"
              ? "bg-[#3B82F6] text-white"
              : "text-white/60 dark:text-white/60 text-gray-600 hover:text-white dark:hover:text-white hover:text-gray-900"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          Top
        </button>
      </div>

      {/* Post Input */}
      <div className="bg-[#1A1A25] dark:bg-[#1A1A25] bg-gray-50 border border-white/10 dark:border-white/10 border-gray-200 rounded-2xl p-4 mb-6">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind, founder?"
          className="w-full bg-transparent text-white dark:text-white text-gray-900 placeholder:text-white/30 dark:placeholder:text-white/30 placeholder:text-gray-400 resize-none outline-none mb-3 min-h-[80px]"
        />
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-white/40 dark:text-white/40 text-gray-500">Posted as: </span>
            <span className="text-xs text-white/60 dark:text-white/60 text-gray-700 font-medium">Founder, SaaS, Pre-seed</span>
          </div>
          <button
            className="px-4 py-2 bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-white/5 disabled:text-white/30 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
            disabled={!newPost.trim()}
          >
            <Send className="w-4 h-4" />
            Post
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {sortedPosts.map((post) => (
          <div
            key={post.id}
            className="bg-[#1A1A25] dark:bg-[#1A1A25] bg-gray-50 border border-white/10 dark:border-white/10 border-gray-200 rounded-2xl overflow-hidden transition-all"
          >
            <div className="p-5">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white/10 to-white/5 dark:from-white/10 dark:to-white/5 from-gray-200 to-gray-100 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white/40 dark:bg-white/40 bg-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{post.founderType}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-white/40 dark:text-white/40 text-gray-500">{post.stage}</p>
                      <span className="text-xs text-white/20 dark:text-white/20 text-gray-300">•</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-white/40" />
                        <p className="text-xs text-white/40 dark:text-white/40 text-gray-500">{post.distance}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/40 dark:text-white/40 text-gray-500">{post.timestamp}</span>
                  <button className="p-1 hover:bg-white/5 dark:hover:bg-white/5 hover:bg-gray-100 rounded transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-white/40 dark:text-white/40 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-sm text-white/80 dark:text-white/80 text-gray-800 leading-relaxed mb-4">
                {post.content}
              </p>

              {/* Interaction Bar */}
              <div className="flex items-center gap-2">
                {/* Voting */}
                <div className="flex items-center gap-1 bg-white/5 dark:bg-white/5 bg-gray-100 border border-white/10 dark:border-white/10 border-gray-200 rounded-lg p-1">
                  <button
                    onClick={() => handleVote(post.id, "up")}
                    className={`p-1.5 rounded transition-all ${
                      post.userVote === "up"
                        ? "bg-[#3B82F6] text-white"
                        : "hover:bg-white/10 dark:hover:bg-white/10 hover:bg-gray-200 text-white/40 dark:text-white/40 text-gray-500 hover:text-[#3B82F6]"
                    }`}
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <span className={`text-sm font-semibold min-w-[32px] text-center ${
                    (post.upvotes - post.downvotes) > 0
                      ? "text-[#3B82F6]"
                      : (post.upvotes - post.downvotes) < 0
                      ? "text-red-400"
                      : "text-white/60 dark:text-white/60 text-gray-600"
                  }`}>
                    {post.upvotes - post.downvotes}
                  </span>
                  <button
                    onClick={() => handleVote(post.id, "down")}
                    className={`p-1.5 rounded transition-all ${
                      post.userVote === "down"
                        ? "bg-red-500 text-white"
                        : "hover:bg-white/10 dark:hover:bg-white/10 hover:bg-gray-200 text-white/40 dark:text-white/40 text-gray-500 hover:text-red-400"
                    }`}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Comments */}
                <button
                  onClick={() => setSelectedPost(post.id)}
                  className="flex-1 px-3 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all flex items-center justify-center gap-2 group"
                >
                  <MessageCircle className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-colors" />
                  <span className="text-xs font-medium text-white/60 group-hover:text-white transition-colors">
                    {post.commentCount}
                  </span>
                </button>

                {/* Share */}
                <button className="p-2 bg-white/5 dark:bg-white/5 bg-gray-100 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-gray-200 border border-white/10 dark:border-white/10 border-gray-200 rounded-lg transition-all group">
                  <Share2 className="w-4 h-4 text-white/40 dark:text-white/40 text-gray-500 group-hover:text-white dark:group-hover:text-white group-hover:text-gray-900 transition-colors" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comments Modal */}
      {selectedPost && selectedPostData && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end">
          <div className="bg-[#0F0F14] w-full max-h-[85vh] rounded-t-3xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h3 className="font-bold text-lg">Comments ({selectedPostData.commentCount})</h3>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {selectedPostData.comments && selectedPostData.comments.length > 0 ? (
                selectedPostData.comments.map((comment) => (
                  <div key={comment.id} className="bg-[#1A1A25] border border-white/10 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white/40" />
                        </div>
                        <div>
                          <p className="text-xs font-medium">{comment.founderType}</p>
                          <p className="text-xs text-white/40">{comment.timestamp}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-white/40">
                        <ArrowUp className="w-3 h-3" />
                        <span className="text-xs">{comment.upvotes}</span>
                      </div>
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed">{comment.content}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <MessageCircle className="w-12 h-12 text-white/20 mx-auto mb-3" />
                  <p className="text-white/40">No comments yet. Be the first!</p>
                </div>
              )}
            </div>

            {/* Comment Input */}
            <div className="p-6 border-t border-white/10 bg-[#1A1A25]">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#3B82F6]/50 transition-colors"
                />
                <button
                  disabled={!newComment.trim()}
                  className="px-5 py-3 bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-white/5 disabled:text-white/30 rounded-xl font-semibold transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
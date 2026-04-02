import ArticleEditor from "@/components/admin/ArticleEditor";

export const metadata = {
  title: "New Article | Admin — TreasuryPulse India",
};

export default function NewArticlePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy">New Article</h1>
        <p className="text-gray-500 text-sm mt-1">Write and publish a new treasury article</p>
      </div>
      <ArticleEditor mode="create" />
    </div>
  );
}

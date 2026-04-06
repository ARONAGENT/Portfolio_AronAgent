interface BlogImageProps {
  src: string;
  caption: string;
  badge?: number;
  loading?: "lazy" | "eager";
}

const BlogImage = ({ src, caption, badge, loading = "lazy" }: BlogImageProps) => (
  <figure className="relative my-6">
    {badge !== undefined && (
      <span className="absolute top-3 left-3 z-10 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
        {badge}
      </span>
    )}
    <img
      src={src}
      alt={caption}
      loading={loading}
      className="blog-image"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.style.display = "none";
        const placeholder = target.nextElementSibling as HTMLElement;
        if (placeholder) placeholder.style.display = "flex";
      }}
    />
    <div
      className="hidden items-center justify-center h-48 rounded-xl bg-surface2 border border-primary/15 text-muted-foreground text-sm mx-auto"
      style={{ maxWidth: 860 }}
    >
      {caption}
    </div>
    <figcaption className="text-center text-[13px] text-muted-foreground mt-2">
      {caption}
    </figcaption>
  </figure>
);

export default BlogImage;

interface BlogImageProps {
  src: string;
  caption: string;
  badge?: number;
  loading?: "lazy" | "eager";
}

const BlogImage = ({ src, caption, badge, loading = "lazy" }: BlogImageProps) => (
  <figure style={{ position: "relative", margin: "24px 0" }}>
    {badge !== undefined && (
      <span style={{
        position: "absolute", top: "12px", left: "12px", zIndex: 10,
        width: "28px", height: "28px", borderRadius: "50%",
        background: "#BC6C25", color: "#FEFAE0",
        fontSize: "11px", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        {badge}
      </span>
    )}
    <img
      src={src}
      alt={caption}
      loading={loading}
      style={{
        width: "100%",
        maxWidth: "860px",
        height: "auto",
        display: "block",
        borderRadius: "8px",
        border: "1px solid rgba(254,250,224,0.07)",
        margin: "0 auto",
      }}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.style.display = "none";
        const placeholder = target.nextElementSibling as HTMLElement;
        if (placeholder) placeholder.style.display = "flex";
      }}
    />
    {/* Fallback placeholder */}
    <div
      style={{
        display: "none",
        alignItems: "center",
        justifyContent: "center",
        height: "192px",
        borderRadius: "12px",
        background: "#1C2416",
        border: "1px solid rgba(188,108,37,0.15)",
        color: "rgba(254,250,224,0.35)",
        fontSize: "13px",
        fontFamily: "'JetBrains Mono', monospace",
        maxWidth: "860px",
        margin: "0 auto",
        letterSpacing: "0.04em",
      }}
    >
      {caption}
    </div>
    <figcaption style={{
      textAlign: "center",
      fontSize: "12px",
      color: "rgba(254,250,224,0.3)",
      marginTop: "10px",
      fontFamily: "'DM Sans', sans-serif",
      lineHeight: 1.5,
      paddingLeft: "8px",
      paddingRight: "8px",
    }}>
      {caption}
    </figcaption>
  </figure>
);

export default BlogImage;
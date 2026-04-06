import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Blogs from "./pages/Blogs.tsx";
import MicroservicesBlog from "./pages/blogs/MicroservicesBlog.tsx";
import DockerBlog from "./pages/blogs/DockerBlog.tsx";
import KafkaBlog from "./pages/blogs/KafkaBlog.tsx";
import CachingBlog from "./pages/blogs/CachingBlog.tsx";
import SpringAiBlog from "./pages/blogs/SpringAiBlog.tsx";
import SpringSecurityBlog from "./pages/blogs/SpringSecurityBlog.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/microservices" element={<MicroservicesBlog />} />
          <Route path="/blogs/docker" element={<DockerBlog />} />
          <Route path="/blogs/kafka" element={<KafkaBlog />} />
          <Route path="/blogs/caching" element={<CachingBlog />} />
          <Route path="/blogs/spring-ai" element={<SpringAiBlog />} />
          <Route path="/blogs/spring-security" element={<SpringSecurityBlog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
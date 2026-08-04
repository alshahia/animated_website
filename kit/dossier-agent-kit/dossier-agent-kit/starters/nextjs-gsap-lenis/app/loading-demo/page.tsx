import { Preloader } from "@/components/Preloader";

export default function LoadingDemoPage() {
  return (
    <Preloader>
      <main>
        <h1>Content is always here, preloader just sits on top of it.</h1>
      </main>
    </Preloader>
  );
}

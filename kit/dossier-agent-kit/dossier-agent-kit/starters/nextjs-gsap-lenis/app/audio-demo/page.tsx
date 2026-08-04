import { AudioVisualizer } from "@/components/AudioVisualizer";

export default function AudioDemoPage() {
  return (
    <main>
      <AudioVisualizer src="/track.mp3" />
    </main>
  );
}

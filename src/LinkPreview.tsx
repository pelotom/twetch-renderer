import renderYouTube from './renderers/renderYouTube';

interface LinkPreviewProps {
  text: string;
}

const renderers = [renderYouTube];

export default function LinkPreview({ text }: LinkPreviewProps) {
  for (const render of renderers) {
    const rendered = render(text);
    if (rendered) return rendered;
  }

  return null;
}

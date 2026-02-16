type Props = {
  previewUrl: string;
};

const PreviewFrame = ({ previewUrl }: Props) => {
  if (!previewUrl) return null;
  return (
    <div className="mt-20">
      <h2 className="text-2xl font-bold ">Live Preview</h2>

      <iframe
        src={previewUrl}
        className="border border-[#ccc] w-100 h-600px rounded-md"
      />
    </div>
  );
};

export default PreviewFrame;

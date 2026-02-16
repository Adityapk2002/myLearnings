type Props = {
  previewUrl: string;
};

const PreviewFrame = ({ previewUrl }: Props) => {
  if (!previewUrl) return null;
  return (
    <div className="mt-10 pb-10">
      <h2 className="text-2xl font-bold ">Live Preview</h2>

      <iframe
        src={previewUrl}
        className="border border-[#ccc] w-full h-[600px] rounded-md mt-3"
      />
      <a
        href={previewUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-3 text-sm text-blue-600 underline"
      >
        Open preview in new tab
      </a>
    </div>
  );
};

export default PreviewFrame;

type Props = {
  code: string;
};

const Preview = ({ code }: Props) => {
  return (
    <div className="h-full w-full">
      <iframe
        srcDoc={code}
        title="preview"
        sandbox="allow-scripts"
        className="w-full h-full bg-white"
      />
    </div>
  );
};

export default Preview;

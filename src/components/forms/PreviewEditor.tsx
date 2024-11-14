import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

type PreviewProps = {
	value?: string;
};

const PreviewEditor = ({ value }: PreviewProps) => {
	return <ReactQuill theme="bubble" value={value} readOnly />;
};

export default PreviewEditor;

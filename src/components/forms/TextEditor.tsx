import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type TextEditorProps = {
	onHandleChange?: (content: string) => void;
	value?: string;
};

const TextEditor = ({ onHandleChange, value }: TextEditorProps) => {
	const handleEditorChange = (content: string) => {
		onHandleChange?.(content);
	};

	return (
		<ReactQuill
			theme="snow"
			value={value}
			onChange={handleEditorChange}
			placeholder="Write something awesome..."
			style={{ height: "200px", marginBlock: "0.5rem" }}
			modules={TextEditor.modules}
			formats={TextEditor.formats}
		/>
	);
};

TextEditor.modules = {
	toolbar: [
		["bold", "italic", "underline", "strike"],
		["blockquote"],
		[{ list: "ordered" }, { list: "bullet" }],
		["link", "image", "video"],
		["clean"],
	],
};

TextEditor.formats = [
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"list",
	"bullet",
	"link",
	"image",
	"video",
];

export default TextEditor;

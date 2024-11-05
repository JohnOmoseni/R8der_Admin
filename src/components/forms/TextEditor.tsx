import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type TextEditorProps = {
  onHandleChange?: any;
  value?: any;
};

const TextEditor = ({ onHandleChange, value }: TextEditorProps) => {
  const handleEditorChange = (
    content: any,
    delta: any,
    source: any,
    editor: ReactQuill.UnprivilegedEditor
  ) => {
    onHandleChange(content);
  };

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={handleEditorChange}
      placeholder="Write something awesome..."
      style={{ height: "200px", marginBlock: "0.6rem 3rem" }}
    />
  );
};

TextEditor.modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike", "blockquote"],
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

import Input from "../atoms/Input";

export default function Search({ className = "" }) {
  const search = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={(e) => search(e)} className={className}>
      <Input placeholder="Search" />
    </form>
  );
}

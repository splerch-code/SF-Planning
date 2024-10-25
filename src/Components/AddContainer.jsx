const AddContainer = ({ addContainer }) => {
  return (
    <button
      className="px-4 py-2 bg-black text-sf border border-sf rounded hover:bg-sf hover:text-black mx-2"
      onClick={addContainer}
    >
      New Container
    </button>
  );
};

export default AddContainer;

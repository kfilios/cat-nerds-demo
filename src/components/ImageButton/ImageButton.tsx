interface ImageButtonProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  src: string;
}

const ImageButton = ({ onClick, src }: ImageButtonProps) => {
  return (
    <div onClick={onClick}>
      <button className="h-300 group w-full overflow-hidden transition-transform">
        <img
          src={src}
          alt=""
          className="w-full transform transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
      </button>
    </div>
  );
};

export default ImageButton;

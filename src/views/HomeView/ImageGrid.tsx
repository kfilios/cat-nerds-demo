import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ImageButton from "components/ImageButton/ImageButton";
import { selectGridSize } from "store/settingsSlice";
import { CatListItem } from "types";
import { splitItemsToColumns } from "utils";

interface Props {
  items: CatListItem[];
}

const ImageGrid = ({ items }: Props) => {
  const navigate = useNavigate();

  const gridSize = useSelector(selectGridSize);

  const renderColumns = (columnCount: number) => {
    const splittedData = splitItemsToColumns(items, gridSize);
    const columns = [];
    for (let i = 0; i < columnCount; i++) {
      columns.push(
        <div
          key={i}
          className={`flex flex-col gap-4 ${gridSize > 1 ? "w-2/4" : ""}`}
        >
          {splittedData[i].map(({ url, id }) => (
            <ImageButton
              key={id}
              onClick={() => navigate(`/cat/${id}`)}
              src={url}
            />
          ))}
        </div>,
      );
    }
    return columns;
  };

  return <div className="flex gap-4">{renderColumns(gridSize)}</div>;
};

export default ImageGrid;

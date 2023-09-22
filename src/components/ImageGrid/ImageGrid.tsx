import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ImageButton } from "components";
import { selectGridSize } from "store/settingsSlice";
import { CatListItem, FilteredByBreed } from "types";
import { splitItemsToColumns } from "utils";

interface Props {
  items: (CatListItem | FilteredByBreed)[];
}

const ImageGrid = ({ items }: Props) => {
  const navigate = useNavigate();

  const gridSize = useSelector(selectGridSize);

  const renderColumns = () => {
    const splittedData =
      items.length > 1 ? splitItemsToColumns(items, gridSize) : [items];
    const columns = [];
    for (let i = 0; i < splittedData.length; i++) {
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

  return <div className="flex gap-4">{renderColumns()}</div>;
};

export default ImageGrid;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useGetCatsByFavouriteQuery } from "api";
import { DisplayError, HeartIcon, ImageGrid, Loading } from "components";
import { selectLoadDataOnInit } from "store/settingsSlice";
import { extractRtkError } from "utils";

const FavouritesView = () => {
  // I didn't implement this due to missing favourite info on cat info. More on this in API file.
  const [page] = useState(0);

  const { data, error, isLoading, refetch } = useGetCatsByFavouriteQuery(page);

  const loadDataOnInit = useSelector(selectLoadDataOnInit);

  useEffect(() => {
    if (loadDataOnInit) refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <DisplayError>{extractRtkError(error)}</DisplayError>;
  }

  return (
    <>
      <h1 className="mb-4 flex items-center gap-2 text-3xl font-bold text-rose-400">
        Favourite cat breeds <HeartIcon className="h-7 w-7" />
      </h1>
      {
        <p className="mb-2">
          {data && data?.length > 0
            ? "Click on an image below to get more info."
            : "You have no favourite cat.. yet!"}
        </p>
      }
      {data && <ImageGrid items={data.map(({ image }) => image)} />}
    </>
  );
};

export default FavouritesView;

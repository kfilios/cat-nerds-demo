import { useEffect, useRef, useState } from "react";

import {
  useFavouriteCatMutation,
  useGetCatByIdQuery,
  useGetCatsByFavouriteQuery,
  useUnfavouriteCatMutation,
} from "api";
import { Button, HeartIcon, Modal, SwitchButton } from "components";
import { extractRtkError } from "utils";

interface Props {
  catId: string;
  closeModal?: () => void;
}

const BreedInfoModal = ({ catId, closeModal }: Props) => {
  const catIdRef = useRef(catId);
  const { data, error, isLoading } = useGetCatByIdQuery(
    catIdRef?.current ?? "",
  );
  const [
    favouriteCatMutation,
    { isLoading: isFavouriteLoading, isError: isFavouriteError },
  ] = useFavouriteCatMutation();
  const { data: favourites, refetch: refetchFavourites } =
    useGetCatsByFavouriteQuery(0);
  const [
    unfavouriteCatMutation,
    { isLoading: isUnfavouriteLoading, isError: isUnfavouriteError },
  ] = useUnfavouriteCatMutation();

  const [souldRefetchFavourites, setSouldRefetchFavourites] = useState(false);

  useEffect(() => {
    if (!catIdRef?.current) catIdRef.current = catId;
  }, [catId]);

  useEffect(() => {
    if (isFavouriteError || isUnfavouriteError) {
      alert("Favourite state couldn't be saved right now.");
    }
  }, [isFavouriteError, isUnfavouriteError]);

  useEffect(() => {
    if (
      souldRefetchFavourites &&
      !isFavouriteLoading &&
      !isUnfavouriteLoading
    ) {
      refetchFavourites();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFavouriteLoading, isUnfavouriteLoading]);

  const imageId = favourites?.find(({ image_id: imageId }) => catId === imageId)
    ?.id;
  const isFavourite = favourites?.some(
    ({ image_id: imageId }) => catId === imageId,
  );

  const handleFavourite = () => {
    setSouldRefetchFavourites(true);
    if (isFavourite) {
      unfavouriteCatMutation(imageId ?? "");
    } else {
      favouriteCatMutation(catId);
    }
  };

  return (
    <>
      {data?.breeds?.[0]?.name && (
        <Modal.Title>{data?.breeds?.[0]?.name}</Modal.Title>
      )}
      <Modal.Content>
        <p className="text-red-600">{error && extractRtkError(error)}</p>
        {isLoading ? (
          "Loading.."
        ) : (
          <>
            <img src={data?.url} alt="" className="w-full" />
            <p className="mt-2">
              {data?.breeds?.[0]?.description
                ? data?.breeds?.[0]?.description
                : "There is no breed info for this cutie."}
            </p>
          </>
        )}
      </Modal.Content>
      <Modal.ButtonArea spaceBetween>
        <Button onClick={closeModal}>Got it, thanks!</Button>
        <SwitchButton
          selected={isFavourite}
          onClick={handleFavourite}
          color="rose-400"
          disabled={isFavouriteLoading || isUnfavouriteLoading}
        >
          <HeartIcon />
          Favourite
        </SwitchButton>
      </Modal.ButtonArea>
    </>
  );
};

export default BreedInfoModal;

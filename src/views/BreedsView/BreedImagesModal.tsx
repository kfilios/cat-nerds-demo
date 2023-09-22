import { useEffect, useRef } from "react";

import { useGetCatsByBreedQuery } from "api";
import { Button, DisplayError, ImageGrid, Loading, Modal } from "components";
import { extractRtkError } from "utils";

interface Props {
  breedName: string;
  breedId: string;
  closeModal?: () => void;
}

const BreedImagesModal = ({ breedName, breedId, closeModal }: Props) => {
  const breedIdRef = useRef(breedId);
  const { data, error, isLoading } = useGetCatsByBreedQuery(
    breedIdRef?.current ?? "",
  );

  useEffect(() => {
    if (!breedIdRef?.current) breedIdRef.current = breedId;
  }, [breedId]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <DisplayError>{extractRtkError(error)}</DisplayError>;
  }

  return (
    <>
      {breedName && <Modal.Title>{breedName}</Modal.Title>}
      <Modal.Content>
        {data ? (
          <ImageGrid items={data} />
        ) : (
          "No data found for the specific breed."
        )}
      </Modal.Content>
      <Modal.ButtonArea>
        <Button onClick={closeModal}>Got it, thanks!</Button>
      </Modal.ButtonArea>
    </>
  );
};

export default BreedImagesModal;

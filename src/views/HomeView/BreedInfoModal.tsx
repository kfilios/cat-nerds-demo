import { useEffect, useRef } from "react";

import { useGetCatByIdQuery } from "api";
import { Button, Modal } from "components";
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

  useEffect(() => {
    if (!catIdRef?.current) catIdRef.current = catId;
  }, [catId]);

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
      <Modal.ButtonArea>
        <Button onClick={closeModal}>Got it, thanks!</Button>
      </Modal.ButtonArea>
    </>
  );
};

export default BreedInfoModal;

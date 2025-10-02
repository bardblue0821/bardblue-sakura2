export interface ImageItem {
  url: string;
  filename: string;
}

export interface ImageModalProps {
  items: ImageItem[];
  index: number;
  onClose: () => void;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}

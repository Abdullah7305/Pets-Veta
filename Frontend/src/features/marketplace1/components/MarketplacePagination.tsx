import Button from "@/shared/components/Button/Button";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const MarketplacePagination = ({ page, totalPages, onPageChange }: Props) => {
  return (
    <div className="mt-10 flex items-center justify-center gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Previous
      </Button>

      {Array.from({ length: totalPages }).map((_, index) => (
        <Button
          key={index}
          size="sm"
          variant={page === index + 1 ? "primary" : "outline"}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default MarketplacePagination;
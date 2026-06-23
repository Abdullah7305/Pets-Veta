import { FaCloudUploadAlt } from "react-icons/fa";
import type { ProductImageUploadProps } from "../types/seller.types";

const ProductImageUpload = ({
  previews,
  onImageChange,
}: ProductImageUploadProps) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        Product Images
      </label>

      <p className="mb-3 text-xs text-gray-400">Upload up to 5 images</p>

      <label className="flex h-36 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-white text-center transition hover:border-[#178f95] hover:bg-[#f2fbfb]">
        <FaCloudUploadAlt className="mb-2 text-3xl text-gray-400" />

        <p className="text-sm font-semibold text-gray-700">Click to upload</p>
        <p className="text-xs text-gray-400">or drag and drop</p>
        <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>

        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            const files = Array.from(e.target.files || []).slice(0, 5);
            if (files.length) onImageChange(files);
          }}
        />
      </label>

      <div className="mt-3 flex gap-3">
        {[0, 1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="flex h-14 w-14 items-center justify-center rounded-lg border border-gray-200 bg-gray-50"
          >
            {previews[item] ? (
              <img
                src={previews[item]}
                alt="preview"
                className="h-full w-full rounded-lg object-cover"
              />
            ) : (
              <span className="text-xs text-gray-400">Img</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImageUpload;

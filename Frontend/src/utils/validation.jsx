export const validateProduct = (product) => {
  let hasMissingData = false;
  let hasWrongDataType = false;

  const price = parseFloat(product.price);
  if (isNaN(price) || price <= 0) {
    hasWrongDataType = true;
  }

  if (!product.sku || !product.name || price === undefined || price === null) {
    hasMissingData = true;
  }

  if (product.type === "Furniture") {
    const { Height, Width, Length } = product.attributes;
    const height = parseFloat(Height);
    const width = parseFloat(Width);
    const length = parseFloat(Length);

    if (
      height === undefined ||
      isNaN(height) ||
      height <= 0 ||
      width === undefined ||
      isNaN(width) ||
      width <= 0 ||
      length === undefined ||
      isNaN(length) ||
      length <= 0
    ) {
      hasMissingData = true;
      hasWrongDataType = true;
    }
  } else {
    if (Object.keys(product.attributes).length === 0) {
      hasMissingData = true;
    }
  }

  return {
    isValid: !hasMissingData && !hasWrongDataType,
    hasMissingData,
    hasWrongDataType,
  };
};

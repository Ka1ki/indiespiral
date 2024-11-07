import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

const SearchFilter = ({ shopVariants, categories = [] }) => {
  const searchParams = useSearchParams();
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    ...shopVariants.reduce(
      (acc, variant) => ({
        ...acc,
        [variant.name]: true,
      }),
      {}
    ),
  });

  const createFilterUrl = (section, value, isSelected) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (section === "category") {
      newSearchParams.delete("search");
      const category = categories.find((cat) => cat._id === value);
      if (category) {
        newSearchParams.set("category", category._id);
      }
    } else {
      // Find the display value instead of using the data value
      const variant = shopVariants.find((v) => v.name === section);
      const index = variant.data.indexOf(value);
      const displayValue = variant.values[index];

      if (isSelected) {
        const currentValues = newSearchParams.getAll(section);
        newSearchParams.delete(section);
        currentValues
          .filter((val) => val !== displayValue) // Compare with display value
          .forEach((val) => newSearchParams.append(section, val));
      } else {
        newSearchParams.append(section, displayValue); // Use display value
      }
    }

    return `?${newSearchParams.toString()}`;
  };

  const isFilterSelected = (section, value) => {
    if (section === "category") {
      return searchParams.get("category") === value;
    }
    // Find the display value for comparison
    const variant = shopVariants.find((v) => v.name === section);
    const index = variant.data.indexOf(value);
    const displayValue = variant.values[index];
    return searchParams.getAll(section).includes(displayValue);
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const createClearFiltersUrl = () => {
    const newSearchParams = new URLSearchParams();
    const name = searchParams.get("name");

    if (name) {
      newSearchParams.set("name", name);
    }

    return `?${newSearchParams.toString()}`;
  };

  const renderCategorySection = () => (
    <div className="collapse collapse-plus border-b border-base-200 rounded-none">
      <input
        type="checkbox"
        checked={expandedSections.category}
        onChange={() => toggleSection("category")}
        className="min-h-0"
      />
      <div className="collapse-title min-h-0 py-4 font-medium capitalize flex items-center text-base-content/80">
        Category
      </div>

      <div className="collapse-content pt-0">
        <div className="flex flex-wrap gap-2 pb-4">
          {categories.map((category) => {
            const isSelected = isFilterSelected("category", category._id);

            return (
              <Link
                key={category._id}
                href={createFilterUrl("category", category._id, isSelected)}
                className={`
                  btn btn-sm capitalize
                  ${
                    isSelected
                      ? "btn-primary text-primary-content"
                      : "btn-outline hover:bg-primary hover:text-primary-content"
                  }
                `}
              >
                {category.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderFilterSection = (variant) => (
    <div className="collapse collapse-plus border-b border-base-200 rounded-none">
      <input
        type="checkbox"
        checked={expandedSections[variant.name]}
        onChange={() => toggleSection(variant.name)}
        className="min-h-0"
      />
      <div className="collapse-title min-h-0 py-4 font-medium capitalize flex items-center text-base-content/80">
        {variant.name}
      </div>

      <div className="collapse-content pt-0">
        <div className="flex flex-wrap gap-2 pb-4">
          {variant.values.map((option, index) => {
            const value = variant.data[index];
            const isSelected = isFilterSelected(variant.name, value);

            return (
              <Link
                key={index}
                href={createFilterUrl(variant.name, value, isSelected)}
                className={`
                  btn btn-sm capitalize
                  ${
                    isSelected
                      ? "btn-primary text-primary-content"
                      : "btn-outline hover:bg-primary hover:text-primary-content"
                  }
                `}
              >
                {option}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );

  const hasFilters = () => {
    return (
      shopVariants.some((variant) => searchParams.has(variant.name)) ||
      searchParams.has("category")
    );
  };

  return (
    <div className="w-96 bg-white p-5">
      <div className="px-2 pb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-base-content">Filters</h2>
          {hasFilters() && (
            <Link
              href={createClearFiltersUrl()}
              className="btn btn-ghost btn-xs text-base-content/70 hover:text-base-content -mr-2"
            >
              Clear all
            </Link>
          )}
        </div>
      </div>

      <div className="space-y-1">
        {categories.length > 0 && renderCategorySection()}

        {shopVariants.map((variant) => (
          <React.Fragment key={variant._id}>
            {renderFilterSection(variant)}
          </React.Fragment>
        ))}
      </div>

      {hasFilters() && (
        <div className="mt-4 px-2">
          <div className="text-sm text-base-content/60">
            {shopVariants.reduce(
              (count, variant) =>
                count + searchParams.getAll(variant.name).length,
              0
            ) + (searchParams.has("category") ? 1 : 0)}{" "}
            filters applied
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;

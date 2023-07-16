import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./Paginator.module.css";

type TPaginatorProps = {
  targetUrl: string;
  items_amount: number;
  part_size: number;
  current_part: number;
};

const Paginator: React.FC<TPaginatorProps> = ({
  targetUrl,
  items_amount,
  part_size,
  current_part,
}) => {
  items_amount = Number(items_amount);
  part_size = Number(part_size);
  current_part = Number(current_part);

  const { t } = useTranslation();

  const [currentPart, setCurrentPart] = useState(current_part);

  useEffect(() => {
    setCurrentPart(current_part);
  }, [current_part]);

  const float_part = items_amount % part_size;
  let parts = Math.floor(items_amount / part_size);

  if (float_part > 0) {
    parts++;
  }

  if (items_amount <= part_size) {
    return <></>;
  }

  const txt_pages = t("paginator__title");
  const txt_forward = t("paginator__txt_forward");
  const txt_back = t("paginator__txt_back");
  const txt_button_disabled = t("paginator__txt_button_disabled");

  let paginationMenuItems = navLinkPaginationArray(
    items_amount,
    part_size,
    currentPart
  );

  return (
    <div className={styles.pagination_wrapper}>
      {paginationMenuItems && (
        <div className={styles.pagination_pagesListWrapper}>
          <span className={styles.pagination_title}>{txt_pages}:</span>
          {paginationMenuItems.map((item, index) => {
            let itemDetails: string[] = item.split("=");
            if (itemDetails[0] === "cp") {
              return (
                <span key={index} className={styles.current_page_link}>
                  {itemDetails[1]}
                </span>
              );
            } else if (itemDetails[0] === "p") {
              return (
                <NavLink
                  onClick={() => setCurrentPart(+itemDetails[1] - 1)}
                  key={index}
                  className={styles.page_link}
                  to={`/${targetUrl}/${+itemDetails[1] - 1}`}
                >
                  {itemDetails[1]}
                </NavLink>
              );
            } else if (itemDetails[0] === "l") {
              return (
                <span key={index} className={styles.offset}>
                  {" "}
                  ...{" "}
                </span>
              );
            } else {
              return undefined;
            }
          })}
        </div>
      )}

      {currentPart > 0 ? (
        <NavLink
          to={`/${targetUrl}/${currentPart - 1}`}
          className={styles.pagination_nav_links}
          onClick={() => setCurrentPart(currentPart - 1)}
        >
          {txt_back}
        </NavLink>
      ) : (
        <span
          className={styles.pagination_nav_links_disabled}
          title={txt_button_disabled}
        >
          {txt_back}
        </span>
      )}

      {currentPart < parts - 1 ? (
        <NavLink
          to={`/${targetUrl}/${currentPart + 1}`}
          className={styles.pagination_nav_links}
          onClick={() => setCurrentPart(currentPart + 1)}
        >
          {txt_forward}
        </NavLink>
      ) : (
        <span
          className={styles.pagination_nav_links_disabled}
          title={txt_button_disabled}
        >
          {txt_forward}
        </span>
      )}
    </div>
  );
};

function navLinkPaginationArray(
  items_amount: number,
  part_size: number,
  current_part: number,
  range_length: number = 5,
  range_length_10: number = 50,
  range_length_100: number = 500
) {
  let linksArray = [];

  items_amount = Number(items_amount);
  part_size = Number(part_size);
  current_part = Number(current_part);

  let float_part = items_amount % part_size;

  let parts = Math.floor(items_amount / part_size);

  if (float_part > 0) {
    parts++;
  }

  let part = 0;

  if (parts > 1) {
    if (current_part >= parts) {
      current_part = parts - 1;
    }

    let left_range = current_part - range_length;

    if (left_range < 0) {
      left_range = 0;
    }

    let left_range_10 = current_part - range_length_10;

    if (left_range_10 < 0) {
      left_range_10 = 0;
    }

    let left_range_100 = current_part - range_length_100;

    if (left_range_100 < 0) {
      left_range_100 = 0;
    }

    let right_range = current_part + range_length;

    if (right_range >= parts) {
      right_range = parts - 1;
    }

    let right_range_10 = current_part + range_length_10;

    if (right_range_10 >= parts) {
      right_range_10 = parts - 1;
    }

    let right_range_100 = current_part + range_length_100;

    if (right_range_100 >= parts) {
      right_range_100 = parts - 1;
    }

    let l_empty = 0;
    let r_empty = 0;

    let page_number = part + 1;

    if (current_part === 0 && part === 0) {
      linksArray.push("cp=" + page_number);
    } else if (current_part !== 0 && part === 0) {
      linksArray.push("p=" + page_number);
    }

    part++;

    while (part < parts - 1) {
      if (part >= left_range_100) {
        if (part <= right_range_100) {
          if (part >= left_range_10) {
            if (part <= right_range_10) {
              if (part >= left_range) {
                page_number = part + 1;
                if (part <= right_range) {
                  if (part === current_part) {
                    linksArray.push("cp=" + page_number);
                  } else {
                    linksArray.push("p=" + page_number);
                  }
                } else {
                  if (r_empty === 0) {
                    r_empty++;
                    linksArray.push("l=...");
                  }

                  if (page_number % 10 === 0) {
                    linksArray.push("p=" + page_number);
                    linksArray.push("l=...");
                  }
                }
              } else {
                if (l_empty === 0) {
                  l_empty++;
                  linksArray.push("l=...");
                }

                page_number = part + 1;

                if (page_number % 10 === 0) {
                  linksArray.push("p=" + page_number);
                  linksArray.push("l=...");
                }
              }
            } else {
              if (r_empty === 0) {
                r_empty++;
                linksArray.push("l=...");
              }

              page_number = part + 1;

              if (page_number % 100 === 0) {
                linksArray.push("p=" + page_number);
                linksArray.push("l=...");
              }
            }
          } else {
            if (l_empty === 0) {
              l_empty++;
              linksArray.push("l=...");
            }

            page_number = part + 1;

            if (page_number % 100 === 0) {
              linksArray.push("p=" + page_number);
              linksArray.push("l=...");
            }
          }
        } else {
          if (r_empty === 0) {
            r_empty++;
            linksArray.push("l=...");
          }

          page_number = part + 1;

          if (page_number % 500 === 0) {
            linksArray.push("p=" + page_number);
            linksArray.push("l=...");
          }
        }
      } else {
        if (l_empty === 0) {
          l_empty++;
          linksArray.push("l=...");
        }

        page_number = part + 1;

        if (page_number % 500 === 0) {
          linksArray.push("p=" + page_number);
          linksArray.push("l=...");
        }
      }
      part++;
    }

    page_number = part + 1;
    if (current_part === parts - 1) {
      linksArray.push("cp=" + page_number);
    } else {
      linksArray.push("p=" + page_number);
    }
  }

  return linksArray;
}

export default Paginator;

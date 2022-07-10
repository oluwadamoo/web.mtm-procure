import React, { useEffect, useState } from "react";

import PageTitle from "../components/Typography/PageTitle";
import InfoCard from "../components/Cards/InfoCard";
import {
  PlaySuitIcon,
  PoloIcon,
  GownIcon,
  JumpSuitIcon,
  CottonDressIcon,
  TrouserIcon,
  TopIcon,
} from "../icons";
import RoundIcon from "../components/RoundIcon";
import { APP_TITLE } from "../utils/title";
import { category } from "../assets/data/products";

function Product() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    document.title = APP_TITLE + " 👚 Products";
  }, []);

  const getCategories = async () => {
    const response = await category();

    setProducts(response);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const icons = [
    {
      name: "top",
      icon: TopIcon,
      colorClass: "text-green-500 dark:text-green-100",
      bgColorClass: "bg-green-100 dark:bg-green-500",
    },
    {
      name: "gown",
      icon: GownIcon,
      colorClass: "text-pink-500 dark:text-pink-100",
      bgColorClass: "bg-pink-100 dark:bg-pink-500",
    },
    {
      name: "jumpsuit",
      icon: JumpSuitIcon,
      colorClass: "text-yellow-500 dark:text-yellow-100",
      bgColorClass: "bg-yellow-100 dark:bg-yellow-500",
    },
    {
      name: "playsuit",
      icon: PlaySuitIcon,
      colorClass: "text-blue-500 dark:text-blue-100",
      bgColorClass: "bg-blue-100 dark:bg-blue-500",
    },
    {
      name: "denim",
      icon: TrouserIcon,
      colorClass: "text-teal-500 dark:text-teal-100",
      bgColorClass: "bg-teal-100 dark:bg-teal-500",
    },
    {
      name: "cotton",
      icon: CottonDressIcon,
      colorClass: "text-red-500 dark:text-red-100",
      bgColorClass: "bg-red-100 dark:bg-red-500",
    },
    {
      name: "polo",
      icon: PoloIcon,
      colorClass: "text-indigo-500 dark:text-indigo-100",
      bgColorClass: "bg-indigo-100 dark:bg-indigo-500",
    },
  ];

  function getIcon(icons, product) {
    let icon = icons.filter((icon) =>
      product.title.toLowerCase().includes(icon.name)
    );
    if (icon[0]?.icon) return icon[0].icon;
    return icons[0].icon;
  }
  function getBgColorClass(icons, product) {
    let icon = icons.filter((icon) =>
      product.title.toLowerCase().includes(icon.name)
    );
    if (icon[0]?.bgColorClass) return icon[0].bgColorClass;
    return icons[0].bgColorClass;
  }
  function getColorClass(icons, product) {
    let icon = icons.filter((icon) =>
      product.title.toLowerCase().includes(icon.name)
    );
    if (icon[0]?.colorClass) return icon[0].colorClass;
    return icons[0].colorClass;
  }
  return (
    <>
      <PageTitle>
        Products{" "}
        <span role="img" aria-label="">
          👚
        </span>
      </PageTitle>

      {/* <SectionTitle>Responsive cards</SectionTitle> */}

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product, i) => (
          <InfoCard title={product.title} value={product.quantity} key={i}>
            <RoundIcon
              icon={getIcon(icons, product)}
              iconColorClass={getColorClass(icons, product)}
              bgColorClass={getBgColorClass(icons, product)}
              className="mr-4"
            />
          </InfoCard>
        ))}
      </div>
    </>
  );
}

export default Product;

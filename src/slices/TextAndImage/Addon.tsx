import { Content, isFilled } from "@prismicio/client";
import { createClient } from "@/prismicio";
import ServiceCard from "@/components/ui/service-card";


type Props = {
  id: string;
};

export async function Addon({ id }: Props) {
  const client = createClient();
  const service = await client.getByID<Content.ServiceDocument>(id);

  const price = isFilled.number(service.data.price)
    ? parseFloat(((service.data.price - 0.01) / 100).toFixed(2)) // Convert cents to dollars with 2 decimal places and subtract 0.01
    : 0;

  let discountPercentage;
  if (service.data.save_offer && isFilled.link(service.data.discount)) {
    const discountDoc = await client.getByID<Content.DiscountDocument>(service.data.discount.id);
    discountPercentage = discountDoc.data.sale_percentage;
  }

  return (
    <div className="w-[320px] py-2">
      <ServiceCard
        serviceName={service.data.name || "Service"}
        price={price}
        discountPercentage={discountPercentage || undefined}
        description={service.data.description || ""}
        icon={service.data.icon}
      />
    </div>
  );
}






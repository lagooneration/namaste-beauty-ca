import { Content, isFilled } from "@prismicio/client";
import { createClient } from "@/prismicio";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
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
    <Accordion className='flex w-full flex-col divide-y divide-zinc-200 dark:divide-zinc-700 pt-2'>
      <AccordionItem value={service.data.name || "Service"}>
        <AccordionTrigger className='w-full py-0.5'>
        <div className="flex flex-col w-full max-w-[290px] mx-auto z-10 p-2">
            <ServiceCard
              serviceName={service.data.name || "Service"}
              price={price}
              discountPercentage={discountPercentage || undefined}
            />
          </div>
        </AccordionTrigger>
        <AccordionContent className="max-w-[290px] mx-auto w-full mb-4">
          <p className='font-mono font-extralight text-left ml-4'>
            {service.data.description}
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
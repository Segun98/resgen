import { BookingFieldResolvers } from "./fields";
import { BookingMutationResolvers } from "./mutations";
import { BookingQueryResolvers } from "./queries";

export const BookingResolvers = [
  ...BookingFieldResolvers,
  ...BookingMutationResolvers,
  ...BookingQueryResolvers,
];

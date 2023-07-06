import { expect } from "@/util/expect";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(expect(process.env.NEXT_PUBLIC_STRIPE_KEY));

export const StripeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<Elements stripe={stripePromise}>{children}</Elements>
);

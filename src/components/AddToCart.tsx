import React from "react";
import { CartItem, useStateDispatch } from "./AppState";

export interface AddToCartProps {
	addToCart: (item: Omit<CartItem, "quantity">) => void;
}

export function withAddToCart<OriginalProps extends AddToCartProps>(
	ChildComponent: React.ComponentType<OriginalProps>
) {
	const AddToCartHOC = (props: Omit<OriginalProps, keyof AddToCartProps>) => {
		const dispatch = useStateDispatch();
		const handleAddToCartClick: AddToCartProps["addToCart"] = (item) => {
			dispatch({
				type: "ADD_TO_CART",
				payload: {
					item,
				},
			});
		};
		return (
			<ChildComponent
				{...(props as OriginalProps)}
				addToCart={handleAddToCartClick}
			/>
		);
	};
	return AddToCartHOC;
}

//this represents the component that it wraps

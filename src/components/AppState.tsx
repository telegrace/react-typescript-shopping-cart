import React, { createContext, useContext, useReducer } from "react";

interface CartItem {
	id: number;
	name: string;
	price: number;
	quantity: number;
}

interface AppStateValue {
	cart: {
		items: CartItem[];
	};
}

const defaultStateValue: AppStateValue = {
	cart: {
		items: [],
	},
};

export const AppStateContext = createContext(defaultStateValue);

export const AppDispatchContext = createContext<
	React.Dispatch<AddToCartAction> | undefined
>(undefined);

interface Action<T> {
	type: T;
}
interface AddToCartAction extends Action<"ADD_TO_CART"> {
	payload: {
		item: Omit<CartItem, "quantity">;
	};
}
const reducer = (state: AppStateValue, action: AddToCartAction) => {
	if (action.type === "ADD_TO_CART") {
		const itemToAdd = action.payload.item;
		const itemExists = state.cart.items.find(
			(item) => item.id === itemToAdd.id
		);
		return {
			...state,
			cart: {
				...state.cart,
				items: itemExists
					? state.cart.items.map((item) => {
							if (item.id === itemToAdd.id) {
								return {
									...item,
									quantity: item.quantity + 1,
								};
							}
							return item;
					  })
					: [...state.cart.items, { ...itemToAdd, quantity: 1 }],
			},
		};
	}
	return state;
};

//custom hook
export const useStateDispatch = () => {
	const stateDispatch = useContext(AppDispatchContext);
	if (!stateDispatch) {
		throw new Error(
			"useStetState was called outside of the AppSetStateContext provider"
		);
	}
	return stateDispatch;
};

const AppStateProvider: React.FC = ({ children }) => {
	//inconsistency between the objs
	const [state, dispatch] = useReducer(reducer, defaultStateValue);
	return (
		<AppStateContext.Provider value={state}>
			<AppDispatchContext.Provider value={dispatch}>
				{children}
			</AppDispatchContext.Provider>
		</AppStateContext.Provider>
	);
};

export default AppStateProvider;

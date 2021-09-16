import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { AppStateContext } from "./AppState";
import CartCSS from "./Cart.module.css";

interface Props {}
interface State {
	isOpen: boolean;
}

class Cart extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			isOpen: false,
		};
		// this.handleClick = this.handleClick.bind(this);
	}
	handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		console.log(e.target);
		// if ((e.target as HTMLElement).nodeName === "SPAN"){
		//     (e.target as HTMLSpanElement).
		// }
		this.setState((prevState) => ({
			isOpen: !prevState.isOpen,
		}));
	};

	render() {
		return (
			<AppStateContext.Consumer>
				{(state) => {
					const itemsCount = state.cart.items.reduce((sum, item) => {
						return sum + item.quantity;
					}, 0);
					return (
						<div className={CartCSS.cartContainer}>
							<button
								className={CartCSS.button}
								type="button"
								onClick={this.handleClick}
							>
								<FiShoppingCart />
								<span>{itemsCount} Pizza(s)</span>
							</button>
							<div
								className={CartCSS.cartDropDown}
								style={{
									display: this.state.isOpen
										? "block"
										: "none",
								}}
							>
								<ul>
									{state.cart.items.map((item) => {
										return (
											<li key={item.id}>
												{item.name} &times;
												{item.quantity}
											</li>
										);
									})}
								</ul>
							</div>
						</div>
					);
				}}
			</AppStateContext.Consumer>
		);
	}
}

export default Cart;

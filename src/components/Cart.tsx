import React, { createRef } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { AppStateContext } from "./AppState";
import CartCSS from "./Cart.module.css";

interface Props {}
interface State {
	isOpen: boolean;
}

class Cart extends React.Component<Props, State> {
	#containerRef: React.RefObject<HTMLDivElement>;
	constructor(props: Props) {
		super(props);
		this.state = {
			isOpen: false,
		};
		// this.handleClick = this.handleClick.bind(this);
		this.#containerRef = createRef();
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

	handleOutsideClick = (e: MouseEvent) => {
		if (
			this.#containerRef.current &&
			!this.#containerRef.current.contains(e.target as Node)
		) {
			this.setState({ isOpen: false });
		}
	};

	handleRemoveOnePizza = (item) => {
		console.log("Remove one pizza", item);
	};

	handleRemovePizzas = (item) => {
		console.log("Remove pizzas", item);
	};

	componentDidMount() {
		document.addEventListener("mousedown", this.handleOutsideClick);
	}

	componentWillUnmount() {
		// stops memory leaks
		document.removeEventListener("mousedown", this.handleOutsideClick);
	}

	render() {
		return (
			<AppStateContext.Consumer>
				{(state) => {
					const itemsCount = state.cart.items.reduce((sum, item) => {
						return sum + item.quantity;
					}, 0);
					return (
						<div
							className={CartCSS.cartContainer}
							ref={this.#containerRef}
						>
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
												<AiOutlineMinusCircle
													onClick={this.handleRemoveOnePizza.bind(
														this,
														item
													)}
												/>
												<BsTrash
													onClick={this.handleRemovePizzas.bind(
														this,
														item
													)}
												/>
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

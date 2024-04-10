import React, { useState } from 'react';
import registration_logo from '../imges/registration_logo.svg';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/actionCreator';
import { toaster } from '../services/toaster';
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from 'react-places-autocomplete';

const data = {
	company_name: '',
	fname: '',
	lname: '',
	email: '',
	mobile: '',
	address: '',
	city: '',
	state: '',
	postal_code: '',
	password: '',
};

const Registration = () => {
	const [accountType, setAccountType] = useState(1);
	const [formData, setFromData] = useState({ ...data });

	const navigate = useNavigate();

	const updateFromData = (e, fieldName) => {
		const { value } = e.target;
		let _fromData = { ...formData };
		_fromData[fieldName] = value;
		setFromData(_fromData);
	};

	const handleSubmit = () => {
		const reqBody = {
			company_name: formData.company_name,
			fname: formData.fname,
			lname: formData.lname,
			email: formData.email,
			account_type: formData.account_type,
			mobile: formData.mobile,
			address: formData.address,
			city: formData.city,
			state: formData.state,
			postal_code: formData.postal_code,
			password: formData.password,
			account_type: accountType === 0 ? 'company' : 'user',
		};

		registerUser(reqBody)
			.then((data) => {
				toaster('Registration  Successfully  ', 'success');
				navigate('/');
			})
			.catch((err) => {
				if (err?.response?.data?.errors && err?.response?.data?.errors?.length > 0) {
					err?.response?.data?.errors.map((err) => {
						return toaster(err, 'error');
					})
				} else {
					toaster(err?.response?.data, 'error');
				}
				console.log('error -=-=-= ', err);
			});
	};

	const handleAddressChange = (address) => {
		setFromData((prevData) => ({
			...prevData,
			address: address,
		}));
	};

	const handleSelect = async (address) => {
		try {
			const results = await geocodeByAddress(address);
			const latLng = await getLatLng(results[0]);
			setFromData((prevData) => ({
				...prevData,
				address: results[0].formatted_address,
				city:
					results[0].address_components.find((component) =>
						component.types.includes('locality')
					)?.long_name || '',
				state:
					results[0].address_components.find((component) =>
						component.types.includes('administrative_area_level_1')
					)?.long_name || '',
				postal_code:
					results[0].address_components.find((component) =>
						component.types.includes('postal_code')
					)?.long_name || '',
			}));
		} catch (error) {
			console.error('Error selecting address:', error);
		}
	};

	const handleCityChange = (city) => {
		setFromData((prevData) => ({
			...prevData,
			city: city,
		}));
	};

	const handleCitySelect = async (city) => {
		try {
			const results = await geocodeByAddress(city);
			const latLng = await getLatLng(results[0]);

			setFromData((prevData) => ({
				...prevData,
				city: results[0].formatted_address,
			}));
		} catch (error) {
			console.error('Error selecting city:', error);
		}
	};

	const handleStateChange = (state) => {
		setFromData((prevData) => ({
			...prevData,
			state: state,
		}));
	};

	const handleStateSelect = async (state) => {
		try {
			const results = await geocodeByAddress(state);
			const latLng = await getLatLng(results[0]);
			setFromData((prevData) => ({
				...prevData,
				state: results[0].formatted_address,
			}));
		} catch (error) {
			console.error('Error selecting state:', error);
		}
	};

	const searchOptionsState = {
		types: ['(regions)'],
		componentRestrictions: { country: 'ca' },
	};

	const searchOptionsCity = {
		types: ['(cities)'],
		componentRestrictions: { country: 'ca' },
	};

	return (
		<>
			<div className="container page">
				<div className="row">
					<div className="col-md-6 mx-auto">
						<div className="card my-5 d-flex">
							<div className="row">
								<div className="col-md-12">
									<h2 className="text-dark mt-5 text-center">
										Create An Account
									</h2>
									<div className="mb-5 font-weight-bold brand-color-text text-center text-uppercase">
										Already a user?{' '}
										<a className="text-decoration-none" href="/">
											Sign In
										</a>
									</div>
									<form className="card-body cardbody-color p-lg-5 text-left">
										<div className="row mt-3">
											<span>Account Type</span>
											<div className="col-md-12">
												<div class="form-check form-check-inline mt-1">
													<input
														class="form-check-input"
														type="radio"
														id="inlineRadio1"
														checked={accountType === 0 ? true : false}
														value="company"
														onChange={() => setAccountType(0)}
													/>
													<label class="form-check-label" htmlFor="inlineRadio1" for="inlineRadio1">
														Company
													</label>
												</div>
												<div class="form-check form-check-inline">
													<input
														class="form-check-input"
														type="radio"
														id="inlineRadio2"
														checked={accountType === 1 ? true : false}
														value="user"
														onChange={() => setAccountType(1)}
													/>
													<label class="form-check-label"  htmlFor="inlineRadio2" for="inlineRadio2">
														User
													</label>
												</div>
											</div>
										</div>
										{accountType === 1 && (
											<div className="row mt-3">
												<div className="col-md-6">
													<div className="form-group">
														<label
															className="mb-1"
															for="fname-label"
														>
															First Name
														</label>
														<input
															type="text"
															id='fname-label'
															name="fname-label"
															value={formData.fname}
															placeholder="Enter your first name"
															className="form-control"
															onChange={(e) => {
																if(!/^[A-Za-z]*$/.test(e.target.value)) return;
																updateFromData(e, 'fname')
															}}
														/>
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-group">
														<label
															className="mb-1"
															for="lname-label"
														>
															Last Name
														</label>
														<input
															type="text"
															id='lname-label'
															name="lname-label"
															className="form-control"
															value={formData.lname}
															placeholder="Enter your last name"
															required
															onChange={(e) => {
																if(!/^[A-Za-z]*$/.test(e.target.value)) return;
																updateFromData(e, 'lname')
															}}
														/>
													</div>
												</div>
											</div>
										)}
										{accountType === 0 && (
											<div className="row mt-3">
												<div className="col-md-12">
													<div className="form-group">
														<label
															id="company-name"
															className="mb-1"
															for="company-name"
															htmlFor="company-name"
														>
															Company Name
														</label>
														<input
															type="text"
															name="company-name"
															id="company-name"
															placeholder="Enter your company"
															className="form-control"
															required
															onChange={(e) => {
																if(!/^[A-Za-z]*$/.test(e.target.value)) return;
																updateFromData(e, 'company_name')
															}}
														/>
													</div>
												</div>
											</div>
										)}
										<div className="row mt-3">
											<div className="col-md-6">
												<div className="form-group">
													<label
														id="email-label"
														className="mb-1"
														for="email"
														htmlFor="email"
													>
														Email
													</label>
													<input
														type="email"
														name="email"
														id="email"
														value={formData.email}
														placeholder="Enter email"
														className="form-control"
														required
														onChange={(e) => updateFromData(e, 'email')}
														onBlur={(e) => {
																const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
																if (!emailRegex.test(e.target.value)) {
																	setFromData({...formData, email: ""})
																	toaster("Invalid Eamil !!", "error");
																	return;
																}
														}}
													/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label
														id="mobile-label"
														className="mb-1"
														for="mobile"
														htmlFor="mobile"
													>
														Mobile
													</label>
													<input
														type="number"
														name="mobile"
														id="mobile"
														value={formData.mobile}
														placeholder="Enter mobile"
														className="form-control"
														required
														onChange={(e) => updateFromData(e, 'mobile')}
														onBlur={(e) => {
															const numberLength = e.target.value.toString().length;
															if (numberLength > 10) {
																setFromData({...formData, mobile: ""})
																toaster("The number is more than 10 digits","error");
																return;
															} else if (numberLength < 10) {
																setFromData({...formData, mobile: ""})	
																toaster("The number is less than 10 digits.", "error");
																return;
															}
														}}
													/>
												</div>
											</div>
										</div>
										<div className="row mt-3">
											<div className="col-md-12">
												<label
													className="mb-1"
													for="address-label"
													>
													Address
												</label>
												<PlacesAutocomplete
													value={formData.address}
													onChange={handleAddressChange}
													onSelect={handleSelect}
												>
													{({
														getInputProps,
														suggestions,
														getSuggestionItemProps,
														loading,
													}) => (
														<div>
															<input
																{...getInputProps({
																	placeholder: 'Enter address',
																	className:
																	'location-search-input form-control',
																	required: true,
																})}
																id="address-label"
															/>
															{loading && <div>Loading...</div>}
															{suggestions &&
																suggestions.length !== 0 && (
																	<div className="react-mapbox-ac-suggestion">
																		{loading && <div>Loading...</div>}
																		{suggestions.map((suggestion) => {
																			const className = suggestion.active
																				? 'suggestion-item--active address-span'
																				: 'suggestion-item address-span';
																			const style = suggestion.active
																				? {
																					backgroundColor: '#fafafa',
																					cursor: 'pointer',
																				}
																				: {
																					backgroundColor: '#ffffff',
																					cursor: 'pointer',
																				};
																			return (
																				<div
																					{...getSuggestionItemProps(
																						suggestion,
																						{
																							className,
																							style,
																						}
																					)}
																				>
																					<span>{suggestion.description}</span>
																				</div>
																			);
																		})}
																	</div>
																)}
														</div>
													)}
												</PlacesAutocomplete>
											</div>
										</div>
										<div className="row mt-3">
											<div className="col-md-4">
												<div className="form-group">
													<label
														className="mb-1"
														for="city-label"
													>
														City
													</label>
													<PlacesAutocomplete
														value={formData.city}
														onChange={handleCityChange}
														onSelect={handleCitySelect}
														searchOptions={searchOptionsCity}
													>
														{({
															getInputProps,
															suggestions,
															getSuggestionItemProps,
															loading,
														}) => (
															<div>
																<input
																	{...getInputProps({
																		placeholder: 'Enter city',
																		className:
																			'location-search-input form-control',
																		required: true,
																	})}
																	id="city-label"
																/>
																{loading && <div>Loading...</div>}
																{suggestions &&
																	suggestions.length > 0 && (
																		<div className="react-mapbox-city-suggestion">
																			{suggestions.map((suggestion) => (
																				<div
																					{...getSuggestionItemProps(
																						suggestion,
																						{
																							className: suggestion.active
																								? 'suggestion-item--active address-span'
																								: 'suggestion-item address-span',
																						}
																					)}
																				>
																					<span>
																						{suggestion.description}
																					</span>
																				</div>
																			))}
																		</div>
																	)}
															</div>
														)}
													</PlacesAutocomplete>
												</div>
											</div>
											<div className="col-md-3">
												<div className="form-group">
													<label
														
														className="mb-1"
														for="state-label"
													>
														State
													</label>
													<PlacesAutocomplete
														value={formData.state}
														onChange={handleStateChange}
														onSelect={handleStateSelect}
														searchOptions={searchOptionsState}
													>
														{({
															getInputProps,
															suggestions,
															getSuggestionItemProps,
															loading,
														}) => (
															<div>
																<input
																	{...getInputProps({
																		placeholder: 'Enter state',
																		className:
																			'location-search-input form-control',
																		required: true,
																	})}
																	id="state-label"
																/>
																{loading && <div>Loading...</div>}
																{suggestions &&
																	suggestions.length > 0 && (
																		<div className="react-mapbox-state-suggestion">
																			{suggestions.map((suggestion) => (
																				<div
																					{...getSuggestionItemProps(
																						suggestion,
																						{
																							className: suggestion.active
																								? 'suggestion-item--active address-span'
																								: 'suggestion-item address-span',
																						}
																					)}
																				>
																					<span>
																						{suggestion.description}
																					</span>
																				</div>
																			))}
																		</div>
																	)}
															</div>
														)}
													</PlacesAutocomplete>
												</div>
											</div>
											<div className="col-md-3">
												<div className="form-group">
													<label
														className="mb-1"
														for="postal-label"
													>
														Postal Code
													</label>
													<input
														type="text"
														name="postal-label"
														id="postal-label"
														value={formData.postal_code}
														placeholder="Enter Postal Code"
														className="form-control"
														required
														onChange={(e) => updateFromData(e, 'postal_code')}
													/>
												</div>
											</div>
										</div>
										<div className="row mt-3">
											<div className="col-md-12">
												<div className="form-group">
													<label
														id="password-label"
														className="mb-1"
														for="password"
														htmlFor="password"
													>
														Password
													</label>
													<input
														type="password"
														name="password"
														id="password"
														value={formData.password}
														placeholder="Enter password"
														className="form-control"
														required
														onChange={(e) => updateFromData(e, 'password')}
													/>
												</div>
											</div>
										</div>
										<div className="text-center">
											<button
												type="button"
												className="btn brand-bg text-white px-5 mt-5 w-50"
												onClick={() => handleSubmit()}
											>
												Sign Up
											</button>
										</div>
									</form>
								</div>
							</div>

						</div>

					</div>

				</div>
			</div>
		</>
	);
};

export default Registration;
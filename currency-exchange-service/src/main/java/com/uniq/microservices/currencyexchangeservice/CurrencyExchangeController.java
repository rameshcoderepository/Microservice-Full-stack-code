package com.uniq.microservices.currencyexchangeservice;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@RestController
public class CurrencyExchangeController {

	private Logger logger = LoggerFactory.getLogger(CurrencyExchangeController.class);

	@Autowired
	private CurrencyExchangeRepository repository;

	@Autowired
	private Environment environment;

	@GetMapping("/")
	public java.util.Map<String, String> home() {
		return java.util.Collections.singletonMap("message", "Currency Exchange Service is running");
	}

	@GetMapping("/currency-exchange/from/{from}/to/{to}")
	public CurrencyExchange retrieveExchangeValue(@PathVariable String from,
			@PathVariable String to) {

		logger.info("retrieveExchangeValue called with {} to {}", from, to);

		String fromCurrency = from == null ? null : from.toUpperCase();
		String toCurrency = to == null ? null : to.toUpperCase();
		if (fromCurrency == null || toCurrency == null) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "from and to currencies are required");
		}
		if (fromCurrency.equals(toCurrency)) {
			return enrichWithEnvironment(new CurrencyExchange(0L, fromCurrency, toCurrency, BigDecimal.ONE));
		}

		CurrencyExchange currencyExchange = repository.findByFromAndTo(fromCurrency, toCurrency);

		if (currencyExchange == null) {
			currencyExchange = computeCrossRate(fromCurrency, toCurrency);
		}

		return enrichWithEnvironment(currencyExchange);

	}

	@GetMapping("/currency-exchange/rates")
	public List<CurrencyExchange> retrieveAllRates() {
		return repository.findAll();
	}

	private CurrencyExchange computeCrossRate(String fromCurrency, String toCurrency) {
		if ("INR".equals(toCurrency)) {
			CurrencyExchange base = repository.findByFromAndTo(fromCurrency, "INR");
			if (base == null) {
				throw new ResponseStatusException(HttpStatus.NOT_FOUND,
						"No rate available for " + fromCurrency + " to INR");
			}
			return new CurrencyExchange(0L, fromCurrency, "INR", base.getConversionMultiple());
		}

		if ("INR".equals(fromCurrency)) {
			CurrencyExchange base = repository.findByFromAndTo(toCurrency, "INR");
			if (base == null) {
				throw new ResponseStatusException(HttpStatus.NOT_FOUND,
						"No rate available for " + toCurrency + " to INR");
			}
			BigDecimal rate = BigDecimal.ONE.divide(base.getConversionMultiple(), 6, RoundingMode.HALF_UP);
			return new CurrencyExchange(0L, "INR", toCurrency, rate);
		}

		CurrencyExchange fromToInr = repository.findByFromAndTo(fromCurrency, "INR");
		CurrencyExchange toToInr = repository.findByFromAndTo(toCurrency, "INR");

		if (fromToInr == null || toToInr == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND,
					"No cross rate available for " + fromCurrency + " to " + toCurrency);
		}

		BigDecimal rate = fromToInr.getConversionMultiple().divide(toToInr.getConversionMultiple(), 6,
				RoundingMode.HALF_UP);
		return new CurrencyExchange(0L, fromCurrency, toCurrency, rate);
	}

	private CurrencyExchange enrichWithEnvironment(CurrencyExchange currencyExchange) {
		String port = environment.getProperty("local.server.port");
		currencyExchange.setEnvironment(port);
		return currencyExchange;
	}
}

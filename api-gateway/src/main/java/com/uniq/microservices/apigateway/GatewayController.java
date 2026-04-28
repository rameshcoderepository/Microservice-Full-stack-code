package com.uniq.microservices.apigateway;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Collections;
import java.util.Map;

@RestController
public class GatewayController {

    @GetMapping("/")
    public Map<String, String> home() {
        return Collections.singletonMap("message",
                "API Gateway is running - All microservices accessible through this gateway");
    }

}

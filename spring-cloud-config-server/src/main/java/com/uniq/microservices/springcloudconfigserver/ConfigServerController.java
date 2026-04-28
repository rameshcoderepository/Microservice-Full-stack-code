package com.uniq.microservices.springcloudconfigserver;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Collections;
import java.util.Map;

@RestController
public class ConfigServerController {

    @GetMapping("/api/status")
    public Map<String, String> home() {
        return Collections.singletonMap("message", "Config Server is running - Centralized Configuration Management");
    }

}

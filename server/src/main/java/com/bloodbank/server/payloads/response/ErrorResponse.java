package com.bloodbank.server.payloads.response;

import org.springframework.http.HttpStatus;

import java.sql.Timestamp;

public class ErrorResponse {

    private Timestamp timestamp;
    private HttpStatus status;
    private String message;
    private String details;

    public ErrorResponse() {
    }

    public ErrorResponse(Timestamp timestamp, HttpStatus status, String message, String details) {
        this.timestamp = timestamp;
        this.status = status;
        this.message = message;
        this.details = details;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }
}

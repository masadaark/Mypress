Feature: Health Check
    As a user, I want to check the status of a service to ensure it's running.
    Scenario Outline: Perform a health check tcNo.<testCaseNumber> "<description>"
        Given Execute postgres query feature content 'healthcheck' step 'getLoan' tcNo.<testCaseNumber>
        # Given Expecting query result
        Given Set request,response feature content 'healthcheck' step 'content' tcNo.<testCaseNumber>
        Given Clear Mapping Server
        Given Post Mapping request
        Given Set request,response feature content 'healthcheck' step 'healthcheck' tcNo.<testCaseNumber>
        When Sending request
        Then Expecting result
        Examples:
            | testCaseNumber | description |
            # | 1              | d2           |
            | 2              | d2           |
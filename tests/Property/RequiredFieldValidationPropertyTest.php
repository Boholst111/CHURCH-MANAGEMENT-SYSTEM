<?php

namespace Tests\Property;

use Tests\TestCase;
use App\Models\Member;
use App\Models\Leadership;
use App\Models\Event;
use App\Models\ChurchSettings;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Validator;
use Eris\TestTrait;
use Eris\Generators;

/**
 * Property-Based Test for Required Field Validation
 * 
 * Feature: church-management-system
 * Property 8: Required field validation
 * Validates: Requirements 3.6
 * 
 * **Validates: Requirements 3.6**
 * 
 * Property: For any entity save operation (member, leadership, event, settings), 
 * if required fields are missing or invalid, the operation should be rejected 
 * with descriptive error messages indicating which fields need correction.
 */
class RequiredFieldValidationPropertyTest extends TestCase
{
    use RefreshDatabase, TestTrait;

    protected function setUp(): void
    {
        parent::setUp();
        // Initialize Eris
        $this->seedingRandomNumberGeneration();
        $this->withRand('mt_rand');
    }

    /**
     * Test that member validation rejects missing required fields.
     * 
     * @test
     */
    public function member_validation_rejects_missing_required_fields()
    {
        $requiredFields = ['first_name', 'last_name', 'email', 'phone', 'address', 'city', 'status', 'date_joined', 'gender'];
        
        $this->forAll(
            Generators::elements(...$requiredFields)
        )
            ->withMaxSize(100)
            ->then(function ($missingField) {
                // Create valid member data
                $validData = [
                    'first_name' => 'John',
                    'last_name' => 'Doe',
                    'email' => 'john.doe' . uniqid() . '@example.com',
                    'phone' => '+1234567890',
                    'address' => '123 Main St',
                    'city' => 'Springfield',
                    'status' => 'active',
                    'date_joined' => '2024-01-01',
                    'gender' => 'male',
                ];
                
                // Remove the required field
                unset($validData[$missingField]);
                
                // Validate the data
                $validator = Validator::make($validData, Member::validationRules());
                
                // Property: Validation should fail when required field is missing
                $this->assertTrue(
                    $validator->fails(),
                    "Validation should fail when required field '{$missingField}' is missing"
                );
                
                // Property: Error message should indicate which field is missing
                $errors = $validator->errors();
                $this->assertTrue(
                    $errors->has($missingField),
                    "Error messages should indicate that '{$missingField}' is required"
                );
                
                // Property: Error message should be descriptive
                $errorMessage = $errors->first($missingField);
                $this->assertNotEmpty(
                    $errorMessage,
                    "Error message for '{$missingField}' should not be empty"
                );
            });
    }

    /**
     * Test that leadership validation rejects missing required fields.
     * 
     * @test
     */
    public function leadership_validation_rejects_missing_required_fields()
    {
        $requiredFields = ['first_name', 'last_name', 'role', 'department', 'email', 'phone', 'start_date'];
        
        $this->forAll(
            Generators::elements(...$requiredFields)
        )
            ->withMaxSize(100)
            ->then(function ($missingField) {
                // Create valid leadership data
                $validData = [
                    'first_name' => 'Jane',
                    'last_name' => 'Smith',
                    'role' => 'Senior Pastor',
                    'department' => 'Ministry',
                    'email' => 'jane.smith' . uniqid() . '@example.com',
                    'phone' => '+1234567890',
                    'start_date' => '2024-01-01',
                ];
                
                // Remove the required field
                unset($validData[$missingField]);
                
                // Validate the data
                $validator = Validator::make($validData, Leadership::validationRules());
                
                // Property: Validation should fail when required field is missing
                $this->assertTrue(
                    $validator->fails(),
                    "Validation should fail when required field '{$missingField}' is missing"
                );
                
                // Property: Error message should indicate which field is missing
                $errors = $validator->errors();
                $this->assertTrue(
                    $errors->has($missingField),
                    "Error messages should indicate that '{$missingField}' is required"
                );
                
                // Property: Error message should be descriptive
                $errorMessage = $errors->first($missingField);
                $this->assertNotEmpty(
                    $errorMessage,
                    "Error message for '{$missingField}' should not be empty"
                );
            });
    }

    /**
     * Test that event validation rejects missing required fields.
     * 
     * @test
     */
    public function event_validation_rejects_missing_required_fields()
    {
        $requiredFields = ['title', 'event_date', 'event_time', 'location', 'status'];
        
        $this->forAll(
            Generators::elements(...$requiredFields)
        )
            ->withMaxSize(100)
            ->then(function ($missingField) {
                // Create valid event data
                $validData = [
                    'title' => 'Sunday Service',
                    'event_date' => '2024-12-25',
                    'event_time' => '10:00',
                    'location' => 'Main Sanctuary',
                    'status' => 'upcoming',
                ];
                
                // Remove the required field
                unset($validData[$missingField]);
                
                // Validate the data
                $validator = Validator::make($validData, Event::validationRules());
                
                // Property: Validation should fail when required field is missing
                $this->assertTrue(
                    $validator->fails(),
                    "Validation should fail when required field '{$missingField}' is missing"
                );
                
                // Property: Error message should indicate which field is missing
                $errors = $validator->errors();
                $this->assertTrue(
                    $errors->has($missingField),
                    "Error messages should indicate that '{$missingField}' is required"
                );
                
                // Property: Error message should be descriptive
                $errorMessage = $errors->first($missingField);
                $this->assertNotEmpty(
                    $errorMessage,
                    "Error message for '{$missingField}' should not be empty"
                );
            });
    }

    /**
     * Test that church settings validation rejects missing required fields.
     * 
     * @test
     */
    public function church_settings_validation_rejects_missing_required_fields()
    {
        $requiredFields = ['church_name', 'address', 'city', 'state', 'zip_code', 'phone', 'email', 'service_times'];
        
        $this->forAll(
            Generators::elements(...$requiredFields)
        )
            ->withMaxSize(100)
            ->then(function ($missingField) {
                // Create valid church settings data
                $validData = [
                    'church_name' => 'Mahayahay Free Methodist Church',
                    'address' => '123 Church St',
                    'city' => 'Mahayahay',
                    'state' => 'Leyte',
                    'zip_code' => '12345',
                    'phone' => '+1234567890',
                    'email' => 'info' . uniqid() . '@church.com',
                    'service_times' => 'Sunday 10:00 AM',
                ];
                
                // Remove the required field
                unset($validData[$missingField]);
                
                // Validate the data
                $validator = Validator::make($validData, ChurchSettings::validationRules());
                
                // Property: Validation should fail when required field is missing
                $this->assertTrue(
                    $validator->fails(),
                    "Validation should fail when required field '{$missingField}' is missing"
                );
                
                // Property: Error message should indicate which field is missing
                $errors = $validator->errors();
                $this->assertTrue(
                    $errors->has($missingField),
                    "Error messages should indicate that '{$missingField}' is required"
                );
                
                // Property: Error message should be descriptive
                $errorMessage = $errors->first($missingField);
                $this->assertNotEmpty(
                    $errorMessage,
                    "Error message for '{$missingField}' should not be empty"
                );
            });
    }

    /**
     * Test that validation rejects invalid field formats.
     * 
     * @test
     */
    public function validation_rejects_invalid_field_formats()
    {
        $this->forAll(
            Generators::elements(
                ['entity' => 'member', 'field' => 'email', 'invalidValue' => 'not-an-email'],
                ['entity' => 'member', 'field' => 'status', 'invalidValue' => 'invalid-status'],
                ['entity' => 'member', 'field' => 'gender', 'invalidValue' => 'invalid-gender'],
                ['entity' => 'member', 'field' => 'date_joined', 'invalidValue' => 'not-a-date'],
                ['entity' => 'leadership', 'field' => 'email', 'invalidValue' => 'invalid@'],
                ['entity' => 'leadership', 'field' => 'start_date', 'invalidValue' => '2024-13-45'],
                ['entity' => 'event', 'field' => 'status', 'invalidValue' => 'invalid-status'],
                ['entity' => 'event', 'field' => 'event_date', 'invalidValue' => 'invalid-date'],
                ['entity' => 'event', 'field' => 'attendance_count', 'invalidValue' => -5],
                ['entity' => 'settings', 'field' => 'email', 'invalidValue' => 'not.an.email']
            )
        )
            ->withMaxSize(100)
            ->then(function ($testCase) {
                $entity = $testCase['entity'];
                $field = $testCase['field'];
                $invalidValue = $testCase['invalidValue'];
                
                // Get valid data for the entity
                $validData = $this->getValidDataForEntity($entity);
                
                // Set the invalid value
                $validData[$field] = $invalidValue;
                
                // Get validation rules for the entity
                $rules = $this->getValidationRulesForEntity($entity);
                
                // Validate the data
                $validator = Validator::make($validData, $rules);
                
                // Property: Validation should fail when field has invalid format
                $this->assertTrue(
                    $validator->fails(),
                    "Validation should fail for {$entity} when '{$field}' has invalid value '{$invalidValue}'"
                );
                
                // Property: Error message should indicate which field is invalid
                $errors = $validator->errors();
                $this->assertTrue(
                    $errors->has($field),
                    "Error messages should indicate that '{$field}' is invalid for {$entity}"
                );
            });
    }

    /**
     * Test that validation accepts valid data for all entities.
     * 
     * @test
     */
    public function validation_accepts_valid_data_for_all_entities()
    {
        $this->forAll(
            Generators::elements('member', 'leadership', 'event', 'settings')
        )
            ->withMaxSize(100)
            ->then(function ($entity) {
                // Get valid data for the entity
                $validData = $this->getValidDataForEntity($entity);
                
                // Get validation rules for the entity
                $rules = $this->getValidationRulesForEntity($entity);
                
                // Validate the data
                $validator = Validator::make($validData, $rules);
                
                // Property: Validation should pass when all required fields are valid
                $this->assertFalse(
                    $validator->fails(),
                    "Validation should pass for {$entity} when all required fields are valid. Errors: " . 
                    json_encode($validator->errors()->toArray())
                );
            });
    }

    /**
     * Test that validation provides multiple error messages when multiple fields are invalid.
     * 
     * @test
     */
    public function validation_provides_multiple_error_messages_for_multiple_invalid_fields()
    {
        $this->forAll(
            Generators::elements('member', 'leadership', 'event', 'settings')
        )
            ->withMaxSize(100)
            ->then(function ($entity) {
                // Create data with multiple missing required fields
                $invalidData = [];
                
                // Get validation rules for the entity
                $rules = $this->getValidationRulesForEntity($entity);
                
                // Validate the empty data (all required fields missing)
                $validator = Validator::make($invalidData, $rules);
                
                // Property: Validation should fail
                $this->assertTrue(
                    $validator->fails(),
                    "Validation should fail for {$entity} when all required fields are missing"
                );
                
                // Property: Should have error messages for multiple fields
                $errors = $validator->errors();
                $this->assertGreaterThan(
                    1,
                    $errors->count(),
                    "Should have error messages for multiple fields when multiple fields are missing for {$entity}"
                );
            });
    }

    /**
     * Helper method to get valid data for an entity.
     */
    private function getValidDataForEntity(string $entity): array
    {
        switch ($entity) {
            case 'member':
                return [
                    'first_name' => 'John',
                    'last_name' => 'Doe',
                    'email' => 'john.doe' . uniqid() . '@example.com',
                    'phone' => '+1234567890',
                    'address' => '123 Main St',
                    'city' => 'Springfield',
                    'status' => 'active',
                    'date_joined' => '2024-01-01',
                    'gender' => 'male',
                ];
            
            case 'leadership':
                return [
                    'first_name' => 'Jane',
                    'last_name' => 'Smith',
                    'role' => 'Senior Pastor',
                    'department' => 'Ministry',
                    'email' => 'jane.smith' . uniqid() . '@example.com',
                    'phone' => '+1234567890',
                    'start_date' => '2024-01-01',
                ];
            
            case 'event':
                return [
                    'title' => 'Sunday Service',
                    'event_date' => '2024-12-25',
                    'event_time' => '10:00',
                    'location' => 'Main Sanctuary',
                    'status' => 'upcoming',
                ];
            
            case 'settings':
                return [
                    'church_name' => 'Mahayahay Free Methodist Church',
                    'address' => '123 Church St',
                    'city' => 'Mahayahay',
                    'state' => 'Leyte',
                    'zip_code' => '12345',
                    'phone' => '+1234567890',
                    'email' => 'info' . uniqid() . '@church.com',
                    'service_times' => 'Sunday 10:00 AM',
                ];
            
            default:
                throw new \InvalidArgumentException("Unknown entity: {$entity}");
        }
    }

    /**
     * Helper method to get validation rules for an entity.
     */
    private function getValidationRulesForEntity(string $entity): array
    {
        switch ($entity) {
            case 'member':
                return Member::validationRules();
            
            case 'leadership':
                return Leadership::validationRules();
            
            case 'event':
                return Event::validationRules();
            
            case 'settings':
                return ChurchSettings::validationRules();
            
            default:
                throw new \InvalidArgumentException("Unknown entity: {$entity}");
        }
    }
}

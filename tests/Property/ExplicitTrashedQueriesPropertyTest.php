<?php

namespace Tests\Property;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Member;
use App\Models\Event;
use App\Models\Leadership;
use App\Models\SmallGroup;
use App\Models\Offering;
use App\Models\Expense;
use App\Models\Budget;
use App\Models\Pledge;
use App\Models\Fund;
use App\Models\Vendor;
use App\Models\ExpenseCategory;
use App\Models\OfferingType;

/**
 * Feature: soft-delete-archive-system
 * Property 6: Explicit trashed queries include archived items
 * 
 * For any archivable model type, when querying with withTrashed() or onlyTrashed(),
 * the results should include records with non-null deleted_at timestamps.
 * 
 * Validates: Requirements 10.2
 */
class ExplicitTrashedQueriesPropertyTest extends TestCase
{
    use RefreshDatabase;

    protected array $archivableModels = [
        Member::class,
        Event::class,
        Leadership::class,
        SmallGroup::class,
        Offering::class,
        Expense::class,
        Budget::class,
        Pledge::class,
        Fund::class,
        Vendor::class,
        ExpenseCategory::class,
        OfferingType::class,
    ];

    /**
     * Property: withTrashed() includes archived items for all archivable models
     * 
     * @test
     */
    public function with_trashed_includes_archived_items_for_all_models()
    {
        foreach ($this->archivableModels as $modelClass) {
            $activeItem = $modelClass::factory()->create();
            $archivedItem = $modelClass::factory()->create();
            $archivedItem->delete();

            $results = $modelClass::withTrashed()->get();

            $this->assertCount(2, $results);
            $this->assertTrue($results->contains('id', $activeItem->id));
            $this->assertTrue($results->contains('id', $archivedItem->id));
        }
    }

    /**
     * Property: onlyTrashed() returns only archived items
     * 
     * @test
     */
    public function only_trashed_returns_only_archived_items()
    {
        foreach ($this->archivableModels as $modelClass) {
            $activeItem = $modelClass::factory()->create();
            $archivedItem = $modelClass::factory()->create();
            $archivedItem->delete();

            $results = $modelClass::onlyTrashed()->get();

            $this->assertCount(1, $results);
            $this->assertFalse($results->contains('id', $activeItem->id));
            $this->assertTrue($results->contains('id', $archivedItem->id));
            $this->assertNotNull($results->first()->deleted_at);
        }
    }

    /**
     * Property: withTrashed()->find() retrieves archived items
     * 
     * @test
     */
    public function with_trashed_find_retrieves_archived_items()
    {
        foreach ($this->archivableModels as $modelClass) {
            $item = $modelClass::factory()->create();
            $itemId = $item->id;
            $item->delete();

            $notFound = $modelClass::find($itemId);
            $this->assertNull($notFound);

            $found = $modelClass::withTrashed()->find($itemId);
            $this->assertNotNull($found);
            $this->assertEquals($itemId, $found->id);
            $this->assertNotNull($found->deleted_at);
        }
    }

    /**
     * Property: withTrashed()->where() includes archived items
     * 
     * @test
     */
    public function with_trashed_where_includes_archived_items()
    {
        foreach ($this->archivableModels as $modelClass) {
            $activeItem = $modelClass::factory()->create();
            $archivedItem = $modelClass::factory()->create();
            $archivedItem->delete();

            $results = $modelClass::withTrashed()->where('id', '>=', 1)->get();

            $this->assertGreaterThanOrEqual(2, $results->count());
            $this->assertTrue($results->contains('id', $archivedItem->id));
        }
    }

    /**
     * Property: withTrashed()->count() includes archived items
     * 
     * @test
     */
    public function with_trashed_count_includes_archived_items()
    {
        foreach ($this->archivableModels as $modelClass) {
            $activeItem = $modelClass::factory()->create();
            $archivedItem = $modelClass::factory()->create();
            $archivedItem->delete();

            $activeCount = $modelClass::count();
            $this->assertEquals(1, $activeCount);

            $totalCount = $modelClass::withTrashed()->count();
            $this->assertEquals(2, $totalCount);
        }
    }

    /**
     * Property: onlyTrashed()->count() counts only archived items
     * 
     * @test
     */
    public function only_trashed_count_counts_only_archived_items()
    {
        foreach ($this->archivableModels as $modelClass) {
            $activeItem = $modelClass::factory()->create();
            $archivedItem1 = $modelClass::factory()->create();
            $archivedItem2 = $modelClass::factory()->create();
            $archivedItem1->delete();
            $archivedItem2->delete();

            $trashedCount = $modelClass::onlyTrashed()->count();
            $this->assertEquals(2, $trashedCount);
        }
    }
}

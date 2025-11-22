import { updateBirdStatus } from "../../../../lib/actions/Auctions";
export const PUT = async (req, { params }) => {
  try {
    // Extract budgetId from params
    console.log("Params:", params);
    const selectedBirdId = params;
    console.log("Selected bird ID:", selectedBirdId.birdId);
    // Validate input
    if (!selectedBirdId.birdId) {
      return new Response(
        JSON.stringify({ error: "Invalid bird ID or amount" }),
        { status: 400 }
      );
    }

    // Call the updateBudgetAmount function
    const result = await updateBirdStatus({
      birdId: selectedBirdId.birdId,
    });


    // Return success response
    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
    });
  } catch (error) {
    console.error("API error:", error);

    // Return error response
    return new Response(
      JSON.stringify({ error: "Server error", details: error.message }),
      { status: 500 }
    );
  }
};
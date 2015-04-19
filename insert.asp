// use asp to run server side code to insert into main database

var cnnString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
var cmd = "insert into Insert values(@City,@FName,@LName)";
using (SqlConnection cnn = new SqlConnection(cnnString))
{
    using (SqlCommand cmd = new SqlCommand(cmd, cnn))
    {
        cmd.Parameters.AddWithValue("@City",txtCity.Text);
        cmd.Parameters.AddWithValue("@FName",txtFName.Text);
        cmd.Parameters.AddWithValue("@LName",txtLName.Text);

        cnn.Open();
        cmd.ExecuteNonQuery();
    }
}
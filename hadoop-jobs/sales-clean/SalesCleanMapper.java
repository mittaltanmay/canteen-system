import java.io.IOException;
import org.apache.hadoop.io.*;
import org.apache.hadoop.mapreduce.Mapper;

public class SalesCleanMapper extends Mapper<LongWritable, Text, Text, Text> {

    @Override
    public void map(LongWritable key, Text value, Context context)
            throws IOException, InterruptedException {

        String line = value.toString().trim();

        // Skip header
        if (line.startsWith("timestamp")) {
            return;
        }

        String[] parts = line.split(",");
        if (parts.length != 5) {
            return; // skip bad rows
        }

        String timestamp = parts[0];
        String item = parts[1];
        String quantity = parts[2];
        String price = parts[3];
        String total = parts[4];

        // Basic validation
        if (timestamp.isEmpty() || item.isEmpty()) return;

        context.write(new Text(timestamp), new Text(item + "," + quantity + "," + price + "," + total));
    }
}

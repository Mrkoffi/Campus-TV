package de.fhws.applab.fiwmodules.utils.scanwelearn;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.CSVRecord;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import java.io.*;
import java.nio.charset.Charset;

/**
 * Created by braunpet on 05.08.15.
 */
public class StartWelearnScan
{
	private static final String WELEARN = "http://www.welearn.de/";

	public static void main( String[] args ) throws Exception
	{
		loadResources( );
	}

	private static String getPictureUrl( Document doc ) throws Exception
	{
		Elements divStaffImage = doc.select( "div.staff-img" );
		Elements staffImage = divStaffImage.select( "a" );
		final String staffImageName = staffImage.attr( "href" );
		System.out.println( "Image: " + staffImageName );
		return staffImageName.isEmpty( ) ? "" : WELEARN + staffImageName;
	}

	private static String getPhoneNumber( Document document )
	{
		return getStaffElement( document, "Telefon.*" );
	}

	private static String getOfficeNumber( Document document )
	{
		return getStaffElement( document, "Raum.*" );
	}

	private static String getAddress( Document document )
	{
		return getStaffElement( document, "Büro.*" );
	}

	private static String getStaffElement( Document document, String staffLabelRegex )
	{
		Elements divStaffElement = document.select( "div.staff-label:matches(" + staffLabelRegex + ")" );
		if ( divStaffElement.size( ) > 0 )
		{
			return divStaffElement.parents( ).get( 0 ).getElementsByClass( "staff-element" ).text( );
		}
		else
		{
			return "";
		}
	}

	// phone number holen aus HTML
	private static void loadResources( ) throws Exception
	{
		try
		{
			final InputStream is = new FileInputStream( new File( "./fhwsmitarbeiter.csv" ) );
			final InputStreamReader inputReader = new InputStreamReader( is );
			final CSVParser csvParser = new CSVParser( inputReader, CSVFormat.newFormat( ';' ) );

			final OutputStream os = new FileOutputStream( new File( "./lecturers.csv" ) );
			final BufferedWriter bw = new BufferedWriter( new OutputStreamWriter( os, Charset.forName( "UTF-8" ) ) );
			final CSVPrinter csvPrinter = new CSVPrinter( bw, CSVFormat.newFormat( ';' ).withRecordSeparator( '\n' ) );

			for ( CSVRecord lecturerRecord : csvParser )
			{
				try
				{
					final String lastName = lecturerRecord.get( 1 );
					final String staffUrl = lecturerRecord.get( 6 );
					final Document doc = Jsoup.connect( staffUrl ).get( );
					final String imageUrl = getPictureUrl( doc );

					if ( imageUrl.isEmpty( ) )
					{
						continue;
					}

					final String phoneNumber = getPhoneNumber( doc );
					final String firstName = lecturerRecord.get( 0 );
					final String titel = lecturerRecord.get( 2 );
					final String emailAddress = lecturerRecord.get( 3 );
					final String postAddress = getAddress( doc );
					final String roomNumber = getOfficeNumber( doc );

					csvPrinter
						.printRecord( firstName, lastName, titel, emailAddress,
							phoneNumber, staffUrl, imageUrl, phoneNumber,
							postAddress, roomNumber );
				}
				catch ( Exception e )
				{
					System.out.println( e.getMessage( ) );
				}
			}

			csvPrinter.flush( );
			csvPrinter.close( );
			os.close( );
		}
		catch ( Exception e )
		{
			System.out.println( e.getMessage( ) );
			e.printStackTrace( );
		}
	}
}

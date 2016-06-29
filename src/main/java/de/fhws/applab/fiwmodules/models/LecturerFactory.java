package de.fhws.applab.fiwmodules.models;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Created by braunpet on 28.07.15.
 */
public class LecturerFactory
{
	private static LecturerFactory INSTANCE;

	private final Map<Long, Lecturer> mapIdToLecturers;

	public final static LecturerFactory getInstance( )
	{
		if ( INSTANCE == null )
		{
			INSTANCE = new LecturerFactory( );
		}

		return INSTANCE;
	}

	private LecturerFactory( )
	{
		this.mapIdToLecturers = new HashMap<>( );
		loadResources( );
	}

	public final int size( )
	{
		return this.mapIdToLecturers.size( );
	}

	public final Lecturer getById( final long id )
	{
		try
		{
			return ( Lecturer ) this.mapIdToLecturers.get( id ).clone( );
		}
		catch ( final Exception e )
		{
			e.printStackTrace( );
			return null;
		}
	}

	public final List<Lecturer> findByFirstNameAndLastName( final String firstName, final String lastName )
	{
		return this.mapIdToLecturers.values( )
			.stream( )
 			.filter( lecturer -> matchesRequest( firstName, lastName, lecturer ) ) 
			.sorted( new LecturerComparator( ) )
			.map( lecturer -> cloneLecturer( lecturer ) )
			.collect( Collectors.toList( ) );
	}

	private Lecturer cloneLecturer( final Lecturer lecturer )
	{
		try
		{
			return ( Lecturer ) lecturer.clone( );
		}
		catch ( final CloneNotSupportedException e )
		{
			return null;
		}
	}

	private boolean matchesRequest( final String firstName, final String lastName, final Lecturer lecturer )
	{
		return matchesName( firstName, lecturer.getFirstName( ) ) &&
			matchesName( lastName, lecturer.getLastName( ) );
	}

	private boolean matchesName( final String fromQuery, final String fromModel )
	{
		return fromQuery.trim( ).isEmpty( ) || fromModel.toLowerCase( ).startsWith( fromQuery.toLowerCase( ) );
	}

	private void loadResources( )
	{
		try
		{
			final InputStream is = this.getClass( ).getResourceAsStream( "lecturers.csv" );
			final InputStreamReader inputReader = new InputStreamReader( is, Charset.forName( "UTF-8" ) );
			final CSVParser csvParser = new CSVParser( inputReader, CSVFormat.newFormat( ';' ) );

			for ( final CSVRecord lecturerRecord : csvParser )
			{
				readLecturer( lecturerRecord );
			}
		}
		catch ( final Exception e )
		{
			e.printStackTrace( );
		}
	}

	private void readLecturer( final CSVRecord record )
	{
		final Lecturer lecturer = new Lecturer( );
		int column = 0;

		lecturer.setId( Long.valueOf( record.get( column++ ) ) );
		lecturer.setFirstName( record.get( column++ ) );
		lecturer.setLastName( record.get( column++ ) );
		lecturer.setTitle( record.get( column++ ) );
		lecturer.setEmail( record.get( column++ ) );
		lecturer.setPhone( record.get( column++ ) );
		lecturer.setUrlWelearn( record.get( column++ ) );
		lecturer.setUrlProfileImage( record.get( column++ ) );
		lecturer.setPhone( record.get( column++ ) );
		lecturer.setAddress( record.get( column++ ) );
		lecturer.setRoomNumber( record.get( column ) );

		this.mapIdToLecturers.put( lecturer.getId( ), lecturer );
	}

	private class LecturerComparator implements Comparator<Lecturer>
	{
		@Override public int compare( final Lecturer o1, final Lecturer o2 )
		{
			return o1.getLastName( ).compareTo( o2.getLastName( ) );
		}
	}
}
